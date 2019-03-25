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

	grunt.initConfig
		clean:
			dist: ['./dist/trocha*']
			test: ['./test/test*']
			testv2: ['./test/v2/*.js']
		includes:
			dist:
				files: [
					cwd: './src/v2/',
					src: 'trocha_*.es6.js'
					dest: './dist'
				]
				options:
					flatten: true
					debug: true
					banner: banner[2]
			test:
				files: [
					'./test/test.coffee': './src/test/main_test.coffee'
					'./test/v2/librarySpec.js': './src/test/v2/librarySpec.js'
					'./test/v2/nodeSpec.js': './src/test/v2/nodeSpec.js'
				]
				options:
					flatten: true
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
					'./test/v2/librarySpec.babeled.js': './test/v2/librarySpec.js' # for IE testing
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
				compress:
					passes: 3
					warnings: true
				beautify: false
				sourceMap: false
				mangle: # false
					reserved: [
						'Trocha'
						'Route'
						'Alias'
						'Resource'
						'Scope'
					]
			files:
				'dist/trocha_module.min.js': 'dist/trocha_module.babeled.js'
				'dist/trocha_library.min.js': 'dist/trocha_library.babeled.js'
		copy:
			hashed:
				files:
					"dist/trocha_library#{pkg.version}.min.js": 'dist/trocha_library.min.js'
		## I'm deprecating CS because the author refuse to be ahead of ESNext proposals
		## ... and the geters implementation lol
		# coffee: test:
		# 	options:
		# 		bare: true
		# 		sourceMap: true
		# 	files:
		# 		# 'dist/trocha.deprecated.js': 'dist/trocha.deprecated.coffee'
		# 		'test/test.js': 'test/test.coffee'

		# coffeescript_concat: compile:
		# 	options: {}
		# 	files:
		# 		'dist/trocha.deprecated.coffee': [
		# 			'src/deprecated/end.coffee'
		# 			'src/deprecated/return.coffee'
		# 			'src/deprecated/routes_engine.coffee'
		# 			'src/deprecated/prepare_path.coffee'
		# 			'src/deprecated/constructor.coffee'
		# 			'src/deprecated/object_definition.coffee'
		# 			'src/deprecated/variables.coffee'
		# 			'src/deprecated/start.coffee'
		# 		]

		watch:
			options: livereload: true
			js:
				files: [ 'src/**/*.*' ]
				tasks: [ 'build' ]
			grunt:
				files: ['Gruntfile.*']
				tasks: [ 'build' ]
				options:
					reload: true

		karma:
			browsersTest:
				configFile: 'karma.conf.js'

		## grunt-mocha only supports browsers
		## simplemocha have dependencies warnings
		## so node mocha test is defined in package.json
		# simplemocha:
		# 	npmTest:
		# 		src: ['./test/v2/nodeSpec.js']

	grunt.registerTask 'build', [
		'clean'
		'includes'
		'babel'
		'uglify'
		'copy'
	]
	grunt.registerTask 'dev', [
		'build'
		'watch'
	]
	grunt.registerTask 'doc', [
		'build'
		'jsdoc'
	]
	grunt.registerTask 'test', [
		'build'
		'karma'
		# 'simplemocha'
	]
	grunt.registerTask 'default', 'build'
