'use strict';

angular.module('pefApp').service('$config', function factory($http, $rootScope, $form, $modal) {
  var FIELDSET_VALIDATE_TESTS = {
    'one_required': {
      test: function (models) {
        return models.some(function (model) {
          return model !== undefined && model !== null && model.length > 0;
        });
      },
      message: 'must have at least one completed field'
    }
  };

  var ELEMENT_VALIDATE_TESTS = {
    'number': {
      test: function (model) {
        return (model === undefined) || /^[0-9]*$/.test(model);
      },
      message: 'should be a number'
    },
    'required': {
      test: function (model) {
        return (model !== undefined) && (model !== null) && model.trim().length !== 0;
      },
      message: 'is required'
    }
  };

  var config = null;
  var tabs = null;
  var selectedTabIndex = 0;

  function resetTabs() {
    $http.get('configuration.json').success(function(data) {
      config = data;
      tabs = config.tabs;

      tabs.push({
        title: 'Confirm',
        name: 'confirm',
        alert: 'Carefully review the information and scroll down to the bottom of the page to save.',
        templateUrl: 'confirm'
      });

      $rootScope.$broadcast('tabsReady');
    });
  }

  $rootScope.$on('reset', function () {
    resetTabs();
  });

  resetTabs();

  var getConfig = function (callback) {
    if (config !== null) {
      return callback(config);
    }
  };

  var getTabs = function (callback) {
    if (tabs !== null) {
      return callback(tabs);
    }
  };

  var selectTab = function (index) {
    getTabs(function (tabs) {
      selectedTabIndex = index;
      $rootScope.$broadcast('selectedTabChanged', tabs[selectedTabIndex]);
    });
  };

  var deselectTab = function () {
    selectedTabIndex = -1;
    $rootScope.$broadcast('selectedTabChanged', null);
  };

  var nextTab = function() {
    selectTab(selectedTabIndex + 1);
  };

  var lastTab = function() {
    selectTab(selectedTabIndex - 1);
  };

  var selectedTab = function () {
    return tabs[selectedTabIndex];
  };

  var getSelectedTabIndex = function () {
    return selectedTabIndex;
  };

  var formKeyValuePairs = function (callback) {
    var pairs = {};

    getTabs(function (tabs) {
      for (var t in tabs) {
        var tab = tabs[t];

        for (var f in tab.fieldsets) {
          var fieldset = tab.fieldsets[f];

          for (var e in fieldset.elements) {
            var element = fieldset.elements[e];

            pairs[element.name] = element.value;
          }
        }
      }

      callback(pairs);
    });
  };

  var submit = function (callback) {
    formKeyValuePairs(function (pairs) {
      $form.add(pairs);
    });

    callback();
  };

  var tabInvalidMessages = function (tab) {
    var invalidMessages = [];

    for (var f in tab.fieldsets) {
      var fieldset = tab.fieldsets[f];
      var fieldsetInvalidMessages = validateFieldset(fieldset, true);
      invalidMessages = invalidMessages.concat(fieldsetInvalidMessages);
    }

    document.getElementById('continueButton').blur();
    document.getElementById('backButton').blur();

    return invalidMessages;
  };

  var showInvalidModal = function (invalidMessages) {
    $modal.open({
      templateUrl: 'views/modal.html',
      controller: 'ModalCtrl',
      resolve: {
        header: function() {
          return null;
        },
        content: function() {
          return ['<p><strong>Please fix the following errors before continuing:</strong></p>',
          '<ul>',
          '<li>',
          invalidMessages.join('</li><li>'),
          '</li>',
          '</ul>'].join('');
        },
        buttons: function() {
          return ['OK'];
        }
      }
    });
  };

  var validateFieldset = function (fieldset, strict) {
    function mapFieldsetToElementValues(element) {
      return element.value;
    }

    var invalidMessages = [];

    for (var e in fieldset.elements) {
      var element = fieldset.elements[e];

      if (!validate(element, strict)) {
        invalidMessages.push(element.title + ' ' + element.invalidMessage + '.');
      }
    }

    if (strict) {
      if (fieldset.rules) {
        for (var rule in fieldset.rules) {
          var test = FIELDSET_VALIDATE_TESTS[rule];

          if (test) {
            var values = fieldset.elements.map(mapFieldsetToElementValues);
            var result = test.test(values);

            if (!result) {
              invalidMessages.push(fieldset.title + ' ' + test.message + '.');
            }
          }
        }
      }
    }

    return invalidMessages;
  };

  var validate = function (element, strict) {
    var value = element.value;

    if (strict || (value !== undefined && value.length > 0)) {
      if (element.rules) {
        for (var rule in element.rules) {
          var test = ELEMENT_VALIDATE_TESTS[rule];

          if (test) {
            var result = test.test(value);

            if (!result) {
              element.valid = false;
              element.invalidMessage = test.message;

              return false;
            }
          }
        }
      }
    }

    element.valid = true;
    element.invalidMessage = null;

    return true;
  };

  return {
    get: getConfig,
    tabs: getTabs,
    selectTab: selectTab,
    deselectTab: deselectTab,
    nextTab: nextTab,
    lastTab: lastTab,

    selectedTab: selectedTab,
    selectedTabIndex: getSelectedTabIndex,

    submit: submit,

    tabInvalidMessages: tabInvalidMessages,
    showInvalidModal: showInvalidModal,
    validateFieldset: validateFieldset,
    validate: validate
  };
});