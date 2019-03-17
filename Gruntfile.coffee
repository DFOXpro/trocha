module.exports = (grunt) ->
	pkg = grunt.file.readJSON('package.json')
	banner = [
		"/** @license "
		"\n* Trocha.js
\n*
\n* This source code is licensed under the Mozillas Public license 2.0 found in the
\n* LICENSE file in the root directory of this source tree.
\n*/\n"
	]
	banner[2] = "#{banner[0]}#{pkg.name}@#{pkg.version} - #{grunt.template.today("yyyy-mm-dd")}#{banner[1]}"
	require('load-grunt-tasks') grunt
	grunt.loadNpmTasks 'grunt-coffeescript-concat'
	grunt.loadNpmTasks 'grunt-includes'
	grunt.loadNpmTasks 'grunt-jsdoc'
	grunt.initConfig
		clean:
			dist: ['./dist/trocha*']
			test: ['./test/test*']
		includes:
			files:
				src: ['trocha_*.es6.js']
				dest: './dist'
				cwd: './src/v2'
			options:
				flatten: true
				debug: true
				banner: banner[2]
		jsdoc:
			dist:
				src: ['./dist/**/*.es6.js', './README.md']
				dest: './api_doc'

		babel:
			options:
				sourceMap: true
				presets: ["@babel/preset-env"]
				plugins: ["@babel/plugin-proposal-class-properties"]
			module:
				files:
					'./dist/trocha_module.babeled.js': './dist/trocha_module.es6.js'
			library:
				options:
					presets: [["@babel/preset-env", { modules: false }]]
				files:
					'./dist/trocha_library.babeled.js': './dist/trocha_library.es6.js'

		# Only works with ES5
		uglify: prod:
			options:
				banner: banner[2]
				wrap: ''
				report: 'gzip'
				maxLineLen: 0
				screwIE8: true
				preserveComments: false
				compress: drop_console: true
				beautify: false
				sourceMap: false
			files:
				'dist/trocha_module.min.js': 'dist/trocha_module.babeled.js'
				'dist/trocha_library.min.js': 'dist/trocha_library.babeled.js'
		coffee: dist:
			options:
				bare: true
				sourceMap: true
			files:
				# 'dist/trocha.deprecated.js': 'dist/trocha.deprecated.coffee'
				'test/test.js': 'test/test.coffee'

		coffeescript_concat: compile:
			options: {}
			files:
				# 'dist/trocha.deprecated.coffee': [
				# 	'src/deprecated/end.coffee'
				# 	'src/deprecated/return.coffee'
				# 	'src/deprecated/routes_engine.coffee'
				# 	'src/deprecated/prepare_path.coffee'
				# 	'src/deprecated/constructor.coffee'
				# 	'src/deprecated/object_definition.coffee'
				# 	'src/deprecated/variables.coffee'
				# 	'src/deprecated/start.coffee'
				# ]
				'test/test.coffee': [
					'src/test/main_test.coffee'
					'src/test/issues_test.coffee'
					'src/test/function_path_test.coffee'
					'src/test/route_types_test.coffee'
					'src/test/routes_creation_test.coffee'
					'src/test/base_variables_test.coffee'
					'src/test/constructor_test.coffee'
					'src/test/constants_test.coffee'
					'src/test/test_framework.coffee'
				]
		watch: js:
			files: [ 'src/**/*.*' ]
			tasks: [ 'build' ]
			options: livereload: true

	grunt.registerTask 'build', [
		'clean'
		'coffeescript_concat'
		'coffee'
		'includes'
		'jsdoc'
		'babel'
		'uglify'
	]
	grunt.registerTask 'dev', [
		'build'
		'watch'
	]
	grunt.registerTask 'default', 'build'
