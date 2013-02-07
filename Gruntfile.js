module.exports = function(grunt) {

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Project configuration.
  grunt.initConfig({
    hash: {
      src: 'examples/*.js',
      mapping: 'examples/assets.json',
      dest: 'examples/dist/'
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'hash']);

};
