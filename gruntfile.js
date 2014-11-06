
module.exports = function(grunt) {  

  var sources_js = [
    "src/js/vinisketch.js",
    "src/js/elemDirectives/button.js",
    "src/js/elemDirectives/switch.js",
    "src/js/elemDirectives/textInput.js",
    "src/js/elemDirectives/comboBox.js",
    "src/js/elemDirectives/slider.js",
    "src/js/elemDirectives/progressBar.js",
    "src/js/elemDirectives/item.js",
    "src/js/elemDirectives/radioButton.js",
    "src/js/elemDirectives/checkBox.js",
    "src/js/elemDirectives/segmentedButton.js",
    "src/js/elemDirectives/image.js",
    "src/js/elemDirectives/splitView.js",
    "src/js/elemDirectives/list.js",
    "src/js/elemDirectives/toolBar.js",
    "src/js/attrDirectives/vsHref.js",
    "src/js/attrDirectives/vsScrollable.js"
  ];
  
  grunt.initConfig({
    concat: {
      options: {
        separator: '\n'
      },
      toolkit: {
        src: sources_js,
        dest: 'build/vs_angular.js'
      },
    },
    less: {
      development: {
        options: {
          paths: ["src/css/generic/", "src/css/flat"]
        },
        files: {
          "build/flat.css": "src/css/flat/flat.less",
          "build/generic.css": "src/css/generic/generic.less"
        }
      }
    },
    copy: {
      iscroll: {
        src: 'bower_components/iscroll/build/iscroll.js',
        dest: 'build/iscroll.js'
      },
      angular: {
        src: 'bower_components/angular/angular.js',
        dest: 'build/angular.js'
      },
      angular_route: {
        src: 'bower_components/angular-route/angular-route.js',
        dest: 'build/angular-route.js'
      },
      angular_touch: {
        src: 'bower_components/angular-touch/angular-touch.js',
        dest: 'build/angular-touch.js'
      },
      fontawesome: {
        src: 'bower_components/fontawesome/css/font-awesome.css',
        dest: 'build/font-awesome.cs'
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js', 'src/js/elemDirectives/*.js', 'src/js/attrDirectives/*.js'], // which files to watch
        tasks: ['concat:toolkit'],
        options: {
          nospawn: true
        }
      },
      css: {
        files: ['src/css/**/*.less'], // which files to watch
        tasks: ['less:development'],
        options: {
          nospawn: true
        }
      }
    }
  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-yui-compressor');

  // tasks
  grunt.registerTask('build', [
    'copy',
    'concat:toolkit',
    'less:development'
  ]);
   
  // tasks
  grunt.registerTask('default', [
    'build'
  ]);

};
