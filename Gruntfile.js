module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('grunt-coffeescript-concat')

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			prod: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
					wrap: '',
					report: 'gzip',
					maxLineLen: 0,
					screwIE8: true,
					preserveComments: false,//false
					// mangleProperties: true,
					// reserveDOMProperties: true,
					// exceptionsFiles: ['uglify.json'],
					// mangle: {
					// 	except: []
					// },
					compress: {
						drop_console: true//true
					},
					beautify: false,//false
					sourceMap: false//false
				},
				files: {
					'dist/trocha.min.js': 'dist/trocha.js'
				}
			}
		},
		coffee: {
			dist: {
				options: {
					bare: true
				},
				files:{
					'dist/trocha.js': 'dist/trocha.coffee' // 1:1 compile
				}
			}
		},
		coffeescript_concat: {
			compile: {
				options: {
				},
				files: {
					'dist/trocha.coffee': [
						'src/end.coffee',
						'src/return.coffee',
						'src/routes_engine.coffee',
						'src/prepare_path.coffee',
						'src/constructor.coffee',
						'src/object_definition.coffee',
						'src/variables.coffee',
						'src/start.coffee'
					]
				}
			}
		},
		watch: {
			js: {
				files: ['src/**/*.coffee'],
				tasks: ['build'],
				options: {
					livereload: 1337
				}
			}
		}
	});

	grunt.registerTask(
		'build', [
			'coffeescript_concat',
			'coffee',
			'uglify'
		]
	);

	grunt.registerTask(
		'dev', [
			'build',
			'watch'
		]
	);
	grunt.registerTask('default', 'build');
};