
module.exports = function(grunt) {  

  var sources_js = [
    "src/js/vinisketch.js",
    "src/js/elementDirectives/button.js",
    "src/js/elementDirectives/switch.js",
    "src/js/elementDirectives/textInput.js",
    "src/js/elementDirectives/comboBox.js",
    "src/js/elementDirectives/slider.js",
    "src/js/elementDirectives/progressBar.js",
    "src/js/elementDirectives/item.js",
    "src/js/elementDirectives/radioButton.js",
    "src/js/elementDirectives/checkBox.js",
    "src/js/elementDirectives/segmentedButton.js",
    "src/js/elementDirectives/image.js",
    "src/js/elementDirectives/splitView.js",
    "src/js/attrDirectives/vsHref.js"
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
    watch: {
      js: {
        files: ['src/js/*.js', 'src/js/elementDirectives/*.js', 'src/js/attrDirectives/*.js'], // which files to watch
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
