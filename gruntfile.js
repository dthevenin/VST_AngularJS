
module.exports = function(grunt) {  

  var sources_js = [
    "src/js/vinisketch.js",
    "src/js/button.js",
    "src/js/switch.js",
    "src/js/textInput.js",
    "src/js/comboBox.js",
    "src/js/slider.js",
    "src/js/progressBar.js",
    "src/js/item.js",
    "src/js/radioButton.js",
    "src/js/checkBox.js",
    "src/js/segmentedButton.js",
    "src/js/image.js",
    "src/js/splitView.js"
  ];
  
  grunt.initConfig({
    concat: {
      options: {
        separator: '\n'
      },
      toolkit: {
        src: sources_js,
        dest: 'examples/vs_angular.js'
      },
    },
    less: {
      development: {
        options: {
          paths: ["src/css/generic/", "src/css/flat"]
        },
        files: {
          "examples/flat.css": "src/css/flat/flat.less",
          "examples/generic.css": "src/css/generic/generic.less"
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'], // which files to watch
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
    'concat:toolkit',
    'less:development'
  ]);
   
  // tasks
  grunt.registerTask('default', [
    'build'
  ]);

};
