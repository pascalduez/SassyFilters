
"use strict";

module.exports = function(grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern.
  require("load-grunt-tasks")(grunt);

  // Time how long tasks take.
  require("time-grunt")(grunt);

  var config = {
    base: "test",
    scss: "test/sass",
    css: "test/css",
    img: "test/img",
    src: "stylesheets",
    dist: "dist"
  }

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    conf: config,

    sass: {
      test: {
        options: {
          //trace: true,
          bundleExec: true,
          style: "expanded",
          require: ["./lib/helpers.rb"],
          loadPath: ["./<%= conf.src %>"]
        },
        files: [{
          expand: true,
          cwd: "<%= conf.scss %>",
          src: ["*.scss"],
          dest: "<%= conf.css %>/",
          ext: ".css"
        }]
      }
    },

    watch: {
      test: {
        files: ["<%= conf.scss %>/*.scss"],
        tasks: ["sass"]
      }
    },

    browserSync: {
      test: {
        bsFiles: {
          src: "<%= conf.css %>/*.css"
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "<%= conf.base %>"
          }
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version", "> 1%", "ie 8"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: "<%= conf.css %>",
          src: "{,*/}*.css",
          dest: "<%= conf.css %>"
        }]
      }
    },

    concat: {
      options: {
        banner: "/*! <%= pkg.name %> – v<%= pkg.version %> – <%= grunt.template.today('yyyy-mm-dd') %> */\n",
      },
      dist: {
        src: [
          // config
          "<%= conf.src %>/config/_config.scss",
          // helpers
          "<%= conf.src %>/helpers/_helpers.scss",
          "<%= conf.src %>/helpers/_svg-filter.scss",
          // filters
          "<%= conf.src %>/filters/_blur.scss",
          "<%= conf.src %>/filters/_brightness.scss",
          "<%= conf.src %>/filters/_contrast.scss",
          "<%= conf.src %>/filters/_custom.scss",
          "<%= conf.src %>/filters/_drop-shadow.scss",
          "<%= conf.src %>/filters/_filter.scss",
          "<%= conf.src %>/filters/_grayscale.scss",
          "<%= conf.src %>/filters/_hue-rotate.scss",
          "<%= conf.src %>/filters/_invert.scss",
          "<%= conf.src %>/filters/_opacity.scss",
          "<%= conf.src %>/filters/_saturate.scss",
          "<%= conf.src %>/filters/_sepia.scss"
        ],
        dest: "<%= conf.dist %>/_<%= pkg.name %>.scss",
      },
    }

  });


  grunt.registerTask("test", [
    "browserSync:test",
    "watch:test"
  ]);

  grunt.registerTask("dist", [
    "concat:dist"
  ]);

  grunt.registerTask("prefix", [
    "autoprefixer"
  ]);

};
