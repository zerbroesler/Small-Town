  'use strict';

  module.exports = function(grunt) {

    grunt.config.merge({
      pkg: grunt.file.readJSON('package.json'),
  connect: {
    options: {
      port: 9003,
      hostname: 'localhost',
      // keepalive : true,
      livereload: 35729,
      open: {
        target: 'http://localhost:9003/index.html',
        appName: 'Chrome'
      },
    },
    rules: [
      // Internal rewrite
      {
        from: '^/src/main/webapp/resources/sap/iot/pdms/lib/(.*)$',
        to: '/public/resources/sap/iot/pdms/lib/$1'
      }, {
        from: '^/src/test/resources/sap/iot/pdms/lib/(.*)$',
        to: '/public/resources/sap/iot/pdms/lib/$1'
      }
    ]
  },
  watch: {
    webapp: {
      files: ['src/*.js', 'maps/*.json'],
      options: {
        livereload: true
      }
    },
  }
});

grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');

// run webserver without proxy
grunt.registerTask('serve-local', ['configureRewriteRules', 'connect']);

grunt.registerTask('default', ['connect' , 'watch:webapp']);

  };
