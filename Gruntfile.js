
module.exports = function(grunt) {

  'use strict';

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take.
  require('time-grunt')(grunt);

  var config = {
    base: './test',
    scss: './test/sass',
    css: './test/css',
    img: './test/img',
    src: './stylesheets',
    dist: './dist'
  }

  var banner = [
    '// <%= pkg.title %> – v<%= pkg.version %>',
    ' – <%= grunt.template.today("yyyy-mm-dd") %>\n',
    '// <%= pkg.homepage %>\n',
    '// License: <%= pkg.license.type %>\n\n'
  ].join('');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    conf: config,

    sass: {
      options: {
        // trace: true,
        bundleExec: true,
        style: 'expanded',
        require: ['./lib/helpers.rb']
      },
      test: {
        options: {
          loadPath: ['<%= conf.src %>']
        },
        files: [{
          expand: true,
          cwd: '<%= conf.scss %>',
          src: ['*.scss'],
          dest: '<%= conf.css %>',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          loadPath: ['<%= conf.dist %>']
        },
        files: [{
          expand: true,
          cwd: '<%= conf.scss %>',
          src: ['*.scss'],
          dest: '<%= conf.css %>',
          ext: '.css'
        }]
      }
    },

    watch: {
      test: {
        files: ['<%= conf.scss %>/*.scss'],
        tasks: ['sass:test']
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

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['package.json'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'master'
      }
    },

    'gh-pages': {
      options: {
        base: 'test',
        message: 'Update gh-pages',
        push: true
      },
      src: ['index.html', 'img/*', 'css/*']
    }

  });


  grunt.registerTask('test', [
    'browserSync:test',
    'watch:test'
  ]);

  grunt.registerTask('dist', [
    'concat:dist',
    'sass:dist'
  ]);

  grunt.registerTask('prefix', [
    'autoprefixer'
  ]);

};
