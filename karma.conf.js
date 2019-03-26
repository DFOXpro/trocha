// Karma configuration
// Generated on Wed Mar 20 2019 19:27:25 GMT-0500 (GMT-05:00)

module.exports = function(config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],

		// list of files / patterns to load in the browser
		files: [
			'./node_modules/chai/chai.js',
			`./dist/trocha_library.${
				process.env.NODE_ENV === 'production' ? 'min' : 'babeled'
			}.js`,
			'./test/v2/librarySpec.babeled.js'
		],

		// list of files / patterns to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		browsers:
			{
				win32: ['Edge', 'IE'],
				linux: ['Chromium', 'Firefox'],
				darwin: ['Safari']
			}[process.platform] || [],
		//** 'IE9', Fails because Mocha and Chai dnt support IE10-
		// customLaunchers: {
		// 	IE9: {
		// 		base: 'IE',
		// 		'x-ua-compatible': 'IE=EmulateIE9'
		// 	},
		// 	IE8: {
		// 		base: 'IE',
		// 		'x-ua-compatible': 'IE=EmulateIE8'
		// 	}
		// },

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
}
