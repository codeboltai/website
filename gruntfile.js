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
      }
    });
  
    // Load the plugin that provides the "string-replace" task.
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
  
    // Default task(s).
    grunt.registerTask('default', ['clean', 'string-replace']);
  
  };