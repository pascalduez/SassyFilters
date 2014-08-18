
module.exports = function(grunt) {

  'use strict';

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take.
  require('time-grunt')(grunt);

  var config = {
    root: '.',
    base: 'test',
    scss: 'test/sass',
    css: 'test/css',
    img: 'test/img',
    src: 'stylesheets',
    dist: 'dist'
  }

  var banner = [
    '// <%= pkg.title %> – v<%= pkg.version %>',
    ' – <%= grunt.template.today("yyyy-mm-dd") %>\n',
    '// <%= pkg.homepage %>\n',
    '// License: <%= pkg.license.type %>\n\n'
  ].join('');

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    pkg: pkg,

    conf: config,

    shell: {
      sass: {
        command: function (target) {
          var command = [
            'bundle exec sass',
            '--style expanded',
            '--load-path',
            config[target],
            '--require',
            '<%= conf.root %>/lib/helpers.rb',
            '<%= conf.scss %>/test-filters.scss',
            '<%= conf.css %>/test-filters.css'
          ].join(' ');

          return grunt.template.process(command);
        }
      }
    },

    watch: {
      test: {
        files: ['<%= conf.scss %>/*.scss'],
        tasks: ['shell:sass:src']
      }
    },

    browserSync: {
      test: {
        bsFiles: {
          src: '<%= conf.css %>/*.css'
        },
        options: {
          watchTask: true,
          server: {
            baseDir: '<%= conf.base %>'
          }
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', '> 1%', 'ie 8']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= conf.css %>',
          src: '{,*/}*.css',
          dest: '<%= conf.css %>'
        }]
      }
    },

    concat: {
      options: {
        banner: banner,
      },
      dist: {
        src: [
          // config
          '<%= conf.src %>/config/_config.scss',
          '<%= conf.src %>/config/_filters.scss',
          // helpers
          '<%= conf.src %>/helpers/_helpers.scss',
          '<%= conf.src %>/helpers/_svg.scss',
          '<%= conf.src %>/helpers/_filters.scss',
          // output
          '<%= conf.src %>/output/_output.scss',
          '<%= conf.src %>/output/_filters.scss',
          '<%= conf.src %>/output/_svg-filter.scss',
          '<%= conf.src %>/output/_disable-filter.scss',
          // filters
          '<%= conf.src %>/filters/_blur.scss',
          '<%= conf.src %>/filters/_brightness.scss',
          '<%= conf.src %>/filters/_contrast.scss',
          // '<%= conf.src %>/filters/_custom.scss',
          '<%= conf.src %>/filters/_drop-shadow.scss',
          '<%= conf.src %>/filters/_grayscale.scss',
          '<%= conf.src %>/filters/_hue-rotate.scss',
          '<%= conf.src %>/filters/_invert.scss',
          '<%= conf.src %>/filters/_opacity.scss',
          '<%= conf.src %>/filters/_saturate.scss',
          '<%= conf.src %>/filters/_sepia.scss'
        ],
        dest: '<%= conf.dist %>/_<%= pkg.title %>.scss',
      },
    },

    clean: {
      rebuild: {
        src: [
          'node_modules',
          'ruby',
          'Gemfile.lock',
          '.sass-cache',
          '.bundle'
        ]
      },
      www: {
        src: ['www']
      }
    },

    copy: {
      www: {
        files: [
          {
            expand: true,
            src: ['docs/**'],
            dest: 'www/'
          },
          {
            expand: true,
            cwd: 'test/',
            src: ['index.html', 'img/**/*', 'css/*'],
            dest: 'www/test'
          }
        ]
      }
    },

    'gh-pages': {
      options: {
        base: 'www',
        message: 'Update gh-pages',
        push: true
      },
      src: ['**']
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'master'
      }
    },

    sassdoc: {
      default: {
        src: 'stylesheets',
        dest: 'docs',
        options: {
          verbose: true,
          display: {
            access: ['public'],
            alias: false,
            watermark: true
          },
          groups: {
            'undefined': 'General',
            config: 'Configuration',
            helpers: 'Helpers',
            output: 'Output',
            filters: 'Filters API'
          },
          package: pkg,
          theme: 'default'
        }
      }
    }

  });

  grunt.registerTask('www', [
    'sassdoc',
    'copy:www',
    'gh-pages',
    'clean:www'
  ]);

  grunt.registerTask('test', [
    'browserSync:test',
    'watch:test'
  ]);

  grunt.registerTask('dist', [
    'concat:dist',
    'shell:sass:dist'
  ]);

  grunt.registerTask('release', [
    "bump-only",
    "dist",
    "bump-commit"
  ]);

  grunt.registerTask('prefix', [
    'autoprefixer'
  ]);

};
