module.exports = (grunt) ->
	require('load-grunt-tasks') grunt
	grunt.loadNpmTasks 'grunt-coffeescript-concat'
	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')
		uglify: prod:
			options:
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
				wrap: ''
				report: 'gzip'
				maxLineLen: 0
				screwIE8: true
				preserveComments: false
				compress: drop_console: true
				beautify: false
				sourceMap: false
			files: 'dist/trocha.min.js': 'dist/trocha.js'
		coffee: dist:
			options: bare: true
			files:
				'dist/trocha.js': 'dist/trocha.coffee'
				'test/test.js': 'test/test.coffee'
		coffeescript_concat: compile:
			options: {}
			files:
				'dist/trocha.coffee': [
					'src/end.coffee'
					'src/return.coffee'
					'src/routes_engine.coffee'
					'src/prepare_path.coffee'
					'src/constructor.coffee'
					'src/object_definition.coffee'
					'src/variables.coffee'
					'src/start.coffee'
				]
				'test/test.coffee': [
					'src/test/end.coffee'
					'src/test/core.coffee'
					'src/test/config.coffee'
				]
		watch: js:
			files: [ 'src/**/*.coffee' ]
			tasks: [ 'build' ]
			options: reload: true

	grunt.registerTask 'build', [
		'coffeescript_concat'
		'coffee'
		'uglify'
	]
	grunt.registerTask 'dev', [
		'build'
		'watch'
	]
	grunt.registerTask 'default', 'build'
