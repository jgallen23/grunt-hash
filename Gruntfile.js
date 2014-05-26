module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    hash: {
      php: {
        options: {
          mapping: 'out/assets.php'
        },
        src: 'examples/*.js',
        dest: 'out/dist/php/'
      },
      json: {
        options: {
          mapping: 'out/assets.json'
        },
        src: 'examples/*.js',
        dest: 'out/dist/json/'
      },
      single: {
        options: {
          mapping: 'out/single.json'
        },
        src: 'examples/test1.js',
        dest: 'out/dist/single/'
      },
      no_map: {
        src: 'examples/*.js',
        dest: 'out/dist/no_map/'
      },
      path: {
        options: {
          mapping: 'out/path.json',
          destBasePath: 'out/',
          srcBasePath: 'examples/'
        },
        src: 'examples/**/*.js',
        dest: 'out/dist/path/'
      },
      flatten: {
        options: {
          mapping: 'out/flatten.json',
          flatten: true
        },
        src: 'examples/**/*.js',
        dest: 'out/dist/flatten/'
      },
      no_dest: {
        options: {
          mapping: 'out/no_dest.json'
        },
        src: 'examples/test1.js'
      },
      custom_hash: {
        options: {
          mapping: 'out/custom_hash.json',
          hashFunction: function(source, encoding){
            return require('crypto')
                .createHash('sha1')
                .update(source, encoding)
                .digest('hex');
          },
          hashSeparator: '-'
        },
        src: 'examples/test1.js'
      },
      comment: {
        options: {
          comment: true
        },
        dest: 'out/dist/comment/',
        src: 'examples/test1.js'
      },
      comment_template: {
        options: {
          comment: {
            template: '<%= grunt.template.today("yyyy-mm-dd") %> - <%= hash.value %>'
          }
        },
        dest: 'out/dist/comment_template/',
        src: 'examples/test1.js'
      },
      comment_template2: {
        options: {
          comment: {
            template: function(data) {
              if(data.src === 'examples/test1.js') {
                return 'test1 - <%= grunt.template.today("yyyy-mm-dd") %> - <%= hash.value %>';  
              } else {
                return '<%= grunt.template.today("yyyy-mm-dd") %> - <%= hash.value %>';  
              }
            }
          }
        },
        dest: 'out/dist/comment_template2/',
        src: 'examples/*.js'
      }
    },
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    clean: [
      'out/', 
      'examples/test1.*.js',
      'examples/test1-*.js'
    ],
    simplemocha: {
      options: {
        ui: 'tdd',
        reporter: 'Spec'
      },
      all: { src: 'test/**/*.js' }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['clean', 'jshint', 'hash', 'simplemocha']);
  grunt.registerTask('dev', ['watch']);


};
