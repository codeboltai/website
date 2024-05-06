module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      clean: {
        build: {
          src: ['build/']
        }
      },

      'string-replace': {
        dist: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.html', '!components/**/*.html'],
            dest: 'build/'
          }],
          options: {
            replacements: grunt.file.expand('src/components/*.html').map(function(filePath) {
              var fileName = filePath.split('/').pop().split('.')[0];
              return {
                pattern: '{{' + fileName + '}}',
                replacement: grunt.file.read(filePath)
              };
            })
          }
        }
      },
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['assets/**/*.css', 'assets/css/vendor/**/*.min.css', '!**/*.min.css'],
            dest: 'build/',
            ext: '.min.css'
          }]
        }
      },
      copy: {
        main: {
          files: [
            {expand: true, cwd: 'src/', src: ['assets/**'], dest: 'build/'}
          ]
        }
      }
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');  
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['clean', 'string-replace', 'cssmin', 'copy']); // Include copy in the default tasks
};
