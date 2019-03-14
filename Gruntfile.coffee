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
	grunt.initConfig
		includes:
			files:
				src: ['trocha_*.es6.js']
				dest: './dist'
				cwd: './src/v2'
			options:
				flatten: true
				debug: true
				banner: banner[2]
		babel:
			options:
				sourceMap: true
			dist:
				files:
					'./dist/trocha2.js': './dist/trocha.es6'
			dist_min:
				options:
					minified: true
					comments: false
				files:
					'./dist/trocha2.min.js': './dist/trocha.es6'
		exec:
			# bsdiff dist/trocha2.min.js dist/trocha2.min.js fix_babel_this.bpatch
			# diff -u dist/trocha2.js dist/trocha2fix.js > fix_babel_this.patch
			fix_babel_this: '
				bspatch ./dist/trocha2.min.js ./dist/trocha2.min.js ./fix_babel_this.bspatch &&
				patch ./dist/trocha2.js < ./fix_babel_this.patch
			'

		## Only works with ES5
		# uglify: prod:
		# 	options:
		# 		banner: banner[2]
		# 		wrap: ''
		# 		report: 'gzip'
		# 		maxLineLen: 0
		# 		screwIE8: true
		# 		preserveComments: false
		# 		compress: drop_console: true
		# 		beautify: false
		# 		sourceMap: false
		# 	files: 'dist/trocha.min.js': 'dist/trocha.js'
		coffee: dist:
			options:
				bare: true
				sourceMap: true
			files:
				# 'dist/trocha.js': 'dist/trocha.coffee'
				'test/test.js': 'test/test.coffee'

		coffeescript_concat: compile:
			options: {}
			files:
				# 'dist/trocha.coffee': [
				# 	'src/end.coffee'
				# 	'src/return.coffee'
				# 	'src/routes_engine.coffee'
				# 	'src/prepare_path.coffee'
				# 	'src/constructor.coffee'
				# 	'src/object_definition.coffee'
				# 	'src/variables.coffee'
				# 	'src/start.coffee'
				# ]
				'test/test.coffee': [
					'src/test/main_test.coffee'
					'src/test/function_path_test.coffee'
					'src/test/routes_creation_test.coffee'
					'src/test/constructor_test.coffee'
					'src/test/constants_test.coffee'
					'src/test/test_framework.coffee'
				]
		watch: js:
			files: [ 'src/**/*.*' ]
			tasks: [ 'build' ]
			options: livereload: true

	grunt.registerTask 'build', [
		'coffeescript_concat'
		'coffee'
		'includes'
		'babel'
		'exec:fix_babel_this'
	]
	grunt.registerTask 'dev', [
		'build'
		'watch'
	]
	grunt.registerTask 'default', 'build'
