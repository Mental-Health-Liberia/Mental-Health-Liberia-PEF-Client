"use strict";angular.module("pefApp",["ui.bootstrap","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("main",{url:"/",templateUrl:"views/page.html",controller:"PageCtrl"})}]),angular.module("pefApp").service("$config",["$http","$rootScope","$state",function(a,b){var c=null,d=null,e=0,f=function(b){return null!==c?b(c):(a.get("configuration.json").success(function(a){return c=a,b(a)}),void 0)},g=function(a){return null!==d?a(d):(f(function(b){return d=b.tabs,m(d),a(d)}),void 0)},h=function(a){g(function(c){e=a,b.$broadcast("selectedTabChanged",c[e])})},i=function(){e=-1,b.$broadcast("selectedTabChanged",null)},j=function(){h(e+1)},k=function(a){g(function(b){return a(b[e])})},l=function(){return e},m=function(a){return a.push({title:"Confirm",name:"confirm",templateUrl:"confirm"}),a},n=function(a){var b={};g(function(c){for(var d in c){var e=c[d];for(var f in e.fieldsets){var g=e.fieldsets[f];for(var h in g.elements){var i=g.elements[h];b[i.name]=i.value}}}a(b)})},o=function(a){n(function(a){console.log("Attempting to submit:",a)}),a()};return b.$on("reset",function(){c=null,d=null}),{get:f,tabs:g,selectTab:h,deselectTab:i,nextTab:j,selectedTab:k,selectedTabIndex:l,submit:o}}]),angular.module("pefApp").directive("pefElement",["$compile",function(a){var b={select:{init:function(a){a.options&&(a.value=a.options[0])},template:'<select ng-model="value" id="{{name}}" name="{{name}}" ng-options="option for option in options"></select>'},text:{template:'<input type="text" ng-model="value" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">'},patient_id:{template:'<div class="input-append"><input type="text" ng-model="value" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}"><button class="btn">Generate</button></div>'},radio:{init:function(a){a.options&&(a.value=a.options[0])},template:'<label class="radio" ng-repeat="option in options"><input type="radio" ng-model="$parent.value" value="{{option}}"> {{option}} </label>'},checkbox:{init:function(a){a.value=a.value||[],a.isChecked=function(b){return-1!==_.indexOf(a.value,b)},a.check=function(b){-1!==!_.indexOf(a.value,b)&&a.value.push(b)}},template:'<label class="checkbox" ng-repeat="option in options"><input type="checkbox" name="{{name}}[]" ng-checked="isChecked(option)" ng-click="check(option)"> {{option}} </label>'},datepicker:{init:function(a){a.value=Date.now()},template:'<div class="well well-small pull-left"><datepicker ng-model="$parent.value" min="minDate" show-weeks="showWeeks" day-format="\'d\'"></timepicker></div>'},timepicker:{init:function(a){a.value=Date.now()},template:'<div class="well well-small pull-left" ng-model="value"><timepicker class="timepicker" show-meridian="true"></timepicker></div>'}};return{restrict:"E",scope:{name:"=name",type:"=type",options:"=options",value:"=value",placeholder:"=placeholder",rules:"=rules",valid:"=valid",invalidMessage:"=invalidMessage",validate:"=validate"},link:function(c,d){c.valid=!0,c.$watch("value",function(){c.validate(c)}),_.has(b,c.type)&&(void 0!==b[c.type].init&&b[c.type].init(c),d.prepend(b[c.type].template)),a(d.contents())(c)}}}]),angular.module("pefApp").controller("NavbarCtrl",["$scope","$rootScope","$config",function(a,b,c){a.maxValidTabIndex=0,c.tabs(function(b){a.tabs=b.map(function(d){return{title:d.title,slug:d.name,selected:_.indexOf(b,d)===c.selectedTabIndex(),disabled:_.indexOf(b,d)>a.maxValidTabIndex}})}),a.$on("selectedTabChanged",function(){a.maxValidTabIndex=Math.max(a.maxValidTabIndex,c.selectedTabIndex()),_.forEach(a.tabs,function(b){b.selected=_.indexOf(a.tabs,b)===c.selectedTabIndex(),b.disabled=_.indexOf(a.tabs,b)>a.maxValidTabIndex})}),b.$on("reset",function(){a.maxValidTabIndex=0}),a.tabSelected=function(a){c.selectTab(a)},c.selectTab(0)}]),angular.module("pefApp").controller("PageCtrl",["$scope","$rootScope","$config",function(a,b,c){var d={number:{test:function(a){return void 0===a||/^[0-9]*$/.test(a)},message:"should be a number"},required:{test:function(a){return void 0!==a&&null!==a&&0!==a.trim().length},message:"is required"}};a.$on("selectedTabChanged",function(b,d){c.tabs(function(b){a.tabs=b}),a.finalizeTabSelected=!1,a.selectedTab=d,window.scrollTo(0,0)}),a.nextButtonClicked=function(){var b=!0,d=[];for(var e in a.selectedTab.fieldsets){var f=a.selectedTab.fieldsets[e];for(var g in f.elements){var h=f.elements[g];a.validate(h,!0)||(d.push(h.title+" "+h.invalidMessage+"."),b=!1)}}b?c.nextTab():window.alert(d.join("\n"))},a.submitButtonClicked=function(){alert("Success"),c.submit(function(){b.$broadcast("reset"),c.selectTab(0)})},a.validate=function(a,b){var c=a.value;if((b||void 0!==c)&&a.rules)for(var e in a.rules){var f=d[e];if(f){var g=f.test(c);if(!g)return a.valid=!1,a.invalidMessage=f.message,!1}}return a.valid=!0,a.invalidMessage=null,!0}}]);