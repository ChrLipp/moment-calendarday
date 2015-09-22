// Karma configuration
module.exports = function(config) {
  config.set({

	  // frameworks to use
	  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	  "frameworks": ["jasmine"],

	  // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	  "browsers": ["PhantomJS"],

	  // base path that will be used to resolve all patterns (eg. files, exclude)
	  //"basePath":"lib",

	  // list of files / patterns to load in the browser
	  "files": ["build/test.js"],

	  // list of files to exclude
	  "excludes": [],

	  // enable / disable colors in the output (reporters and logs)
	  "colors": true,

      // Continuous Integration mode
      "singleRun": "true"
	})
};
