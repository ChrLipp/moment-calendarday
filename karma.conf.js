// Karma configuration
module.exports = function(config) {
  config.set({

	  // frameworks to use
	  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	  frameworks : ['jasmine'],

	  // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	  browsers : ['PhantomJS'],

	  // list of files / patterns to load in the browser
	  files : [
		  'node_modules/moment/moment.js',
		  'lib/web/moment-calendarday.js',
		  'build/test/test.js'],

	  // enable / disable colors in the output (reporters and logs)
	  colors : true,

      // Continuous Integration mode
      singleRun : true,

	  // coverage reporter generates the coverage
	  reporters : ['progress', 'coverage'],

	  preprocessors : {
		  'lib/web/moment-calendarday.js': ['coverage']
	  },

	  coverageReporter: {
		  dir : 'build/coverage',
		  reporters: [
			  { type : 'text-summary' },
			  { type : 'html', subdir : 'report-html' },
			  { type : 'json', subdir : 'report-json', file : 'coverage-js.json' }],
	  }
  })
};
