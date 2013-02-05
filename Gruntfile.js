module.exports = function(grunt) {

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/**/*.js']
    },
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
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        strict: false
      },
      globals: {}
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'hash']);

};
