module.exports = function(grunt) {

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Project configuration.
  grunt.initConfig({
    hash: {
      php: {
        options: {
          mapping: 'examples/assets.php'
        },
        src: 'examples/*.js',
        dest: 'examples/dist/php/'
      },
      json: {
        options: {
          mapping: 'examples/assets.json'
        },
        src: 'examples/*.js',
        dest: 'examples/dist/json/'
      },
      single: {
        options: {
          mapping: 'examples/single.json'
        },
        src: 'examples/test1.js',
        dest: 'examples/dist/single/'
      },
      no_dest: {
        options: {
          mapping: 'examples/no_dest.json'
        },
        src: 'examples/test1.js'
      },
      no_map: {
        src: 'examples/*.js',
        dest: 'examples/dist/no_map/'
      }
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
