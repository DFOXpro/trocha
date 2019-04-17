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
					'./test/v2/moduleSpec.js': './src/test/v2/moduleSpec.js'
					'./test/v2/nodeSpec.js': './src/test/v2/nodeSpec.js'
				]
				options:
					flatten: true
		jsdoc:
			dist:
				src: [
					'./dist/trocha_module.es6.js'
					'./README.md'
					# './CHANGELOG.md'
					# './CONTRIBUTING.md'
					# './LICENSE.md'
				]
				dest: './api_doc'
				# options: ignoreWarnings: true

		babel:
			# options: @see .babelrc
			module:
				files:
					'./dist/trocha_module.babeled.js': './dist/trocha_module.es6.js'
			test:
				files:
					'./test/v2/librarySpec.babeled.js': './test/v2/librarySpec.js' # for IE testing
			library:
				options:
					presets: [["@babel/preset-env", { modules: false }]] # keep `this` untouched
				files:
					'./dist/trocha_library.babeled.js': './dist/trocha_library.es6.js'

		# Only works with ES5
		# in a side note the Trocha side inside a module bundle like parcel or webpack
		# is arround 10KB :D
		uglify: prod:
			options:
				banner: banner[2]
				wrap: ''
				report: 'gzip'
				maxLineLen: 0
				screwIE8: true # yeah by default we dont support any less than IE11
				preserveComments: false
				compress:
					passes: 3
					warnings: true
				beautify: false
				sourceMap: false
				mangle:
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
				files: [ 'src/v2/*.*' ]
				tasks: [ 'build' ]
			doc:
				files: [ 'src/v2/*.*' ]
				tasks: [ 'includes:dist', 'jsdoc' ]
			test:
				files: [ 'src/test/**/*.*' ]
				tasks: [ 'test:node' ]
				options: livereload: false
			full:
				files: [ 'src/**/*.*' ]
				tasks: [ 'clean', 'build', 'test:node' ]
				options: livereload: false
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
		## so node mocha test is defined via exec
		# simplemocha:
		# 	npmTest:
		# 		src: ['./test/v2/nodeSpec.js']
		exec:
			mocha: 'npx mocha ./test/v2/nodeSpec.js'

	###*
	 * Compile all production and development files, use with NODE_ENV=production
	 * for better production results
	 * @default
	 ###
	grunt.registerTask 'build', [
		'clean:dist'
		'includes:dist'
		'babel:module'
		'babel:library'
		'uglify'
		'copy'
	]

	###*
	 * Compile dist files and keep in watch+livereload mode
	 ###
	grunt.registerTask 'dev', [
		'build'
		'watch'
	]

	###*
	 * Compile es6 files and jsdoc
	 ###
	grunt.registerTask 'doc', [
		'includes:dist'
		'jsdoc'
	]
	grunt.registerTask 'doc:watch', [
		'includes:dist'
		'jsdoc'
		'watch:doc'
	]

	###*
	 * Compile test/v2 files
	 ###
	grunt.registerTask 'build:test', [
		'clean:test'
		'clean:testv2'
		'includes:test'
	]

	###*
	 * Compile test/v2 files and run test for node, it's fast
	 ###
	grunt.registerTask 'test:node', [
		'build:test'
		# 'simplemocha'
		'exec'
	]

	###*
	 * Compile all and test node & all available browsers
	 ###
	grunt.registerTask 'test', [
		'build'
		'test:node'
		'babel:test'
		'karma'
	]

	###*
	 * Compile test/v2 files and keep in watch
	 ###
	grunt.registerTask 'test:watch', [
		# 'test:node'
		'watch:test'
	]

	###*
	 * Compile all and keep in watch
	 * test node every reload
	 ###
	grunt.registerTask 'dev:full', [
		'build'
		'build:test'
		'watch:full'
	]

	grunt.registerTask 'default', 'build'
