/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '0.1.0'
    },

    concat: {
      options: {

    banner: '\n/*! <%= pkg.name %>.jsx - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        stripBanners: false
      },
      scripts: {
        src: ['src/obj-io.jsx'],
        dest: 'src/tmp/<%= pkg.name %>.concat.<%= pkg.version %>.jsx'
      }
    },

    copy: {
      "script": {
        src: "src/tmp/<%= pkg.name %>.concat.wrap.<%= pkg.version %>.jsx",
        dest: "dist/<%= pkg.name %>.<%= pkg.version %>.jsx",
      },
    },
     /**
     * wrap it
     */
    wrap: {
      'script': {
        src: ['src/tmp/<%= pkg.name %>.concat.<%= pkg.version %>.jsx'],
        dest: 'src/tmp/<%= pkg.name %>.concat.wrap.<%= pkg.version %>.jsx',
        options: {
          wrapper: ['//before\n', '\n//after']
        },
      },
    },
    watch: {
      files: ['src/*.jsx', 'src/*.js', 'src/lib/*'],
      tasks: ['concat:scripts', 'wrap:script','copy:script']
    }

  });

  grunt.registerTask('default', ['watch']);

};
