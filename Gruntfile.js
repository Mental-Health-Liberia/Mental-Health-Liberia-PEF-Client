'use strict';
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  var nodemonIgnoredFiles = [
    'README.md',
    'Gruntfile.js',
    'karma.conf.js',
    'karma-e2e.conf.js',
    '/.git/',
    '/node_modules/',
    '/app/',
    '/dist/',
    '/test/',
    '/temp/',
    '/.tmp',
    '/.sass-cache',
  ];

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist'],
        options: {
          livereload: true
        }
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test'],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/components',
        relativeAssets: false,
        raw: 'http_images_path=\'../images\'\nhttp_generated_images_path=\'../images\'\n'
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'configuration.json',
            'components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*',
            'images/{,*/}*.png'
          ]
        }]
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: '<%= yeoman.dist %>/',
          // cache: ['js/app.js', 'css/style.css'],
          network: ['*', 'http://*', 'https://*'],
          // fallback: ['/ /offline.html'],
          // exclude: ['js/jquery.min.js'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['index.html']
        },
        src: [
          '*.html',
          'components/*/*.js',
          'views/{,*/}*.html',
          'scripts/{,*/}*.js',
          'styles/{,*/}*.css',
          // 'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          // 'styles/fonts/*'
        ],
        dest: '<%= yeoman.dist %>/manifest.appcache'
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: ['development'],
          // nodemon watches the current directory recursively by default
          // watchedFolders: ['.'],
          debug: true,
          delayTime: 1,
          ignoredFiles: nodemonIgnoredFiles,
        }
      }
    },
    concurrent: {
      nodemon: {
        options: {
          logConcurrentOutput: true,
        },
        tasks: [
          'nodemon:dev',
          'watch',
        ],
      },
      server: [
        'clean:server',
        'compass:server',
        'coffee:dist'
      ]
    },
  });

  grunt.registerTask('server', [
    'concurrent:nodemon',
    'concurrent:server'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    // 'test',
    'coffee',
    'compass:dist',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'manifest'
  ]);

  grunt.registerTask('default', ['build']);
};
