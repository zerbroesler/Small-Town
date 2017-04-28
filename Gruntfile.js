  'use strict';

  module.exports = function(grunt) {

	  grunt.config.merge({
		  pkg: grunt.file.readJSON('package.json'),
		  connect: {
			  options: {
				  port: 9003,
				  hostname: 'localhost',
				  livereload: 35729,
				  open: {
					  target: 'http://localhost:9003/index.html',
					  appName: 'Chrome'
				  },
			  },
			  rules: [
			          ]
		  },
		  watch: {
			  webapp: {
				  files: ['src/**.js', 'maps/*.json'],
				  options: {
					  livereload: true
				  }
			  },
		  }
	  });

	  grunt.loadNpmTasks('grunt-contrib-connect');
	  grunt.loadNpmTasks('grunt-contrib-watch');

	  grunt.registerTask('default', ['connect' , 'watch:webapp']);
};
