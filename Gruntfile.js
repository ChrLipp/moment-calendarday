module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-file-append');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('remap-istanbul');
	grunt.loadNpmTasks('grunt-contrib-watch');

	require('time-grunt')(grunt);

	grunt.initConfig({
		ts: {
			web: {
				src: [
					'src/CalendarDayConfig.ts',
					'src/CalendarDayEntries.ts',
					'src/moment-calendarday.ts'],
				out: 'lib/web/moment-calendarday.js',
				options: {
					references: ['typings/**/*.d.ts'],
					sourceMap: true,
					removeComments: false
				}
			},
			test: {
				src: ['test/**/*.ts'],
				out: 'build/test/test.js',
				options: {
					references: ['typings/**/*.d.ts'],
					sourceMap: false,
					removeComments: false
				}
			}
		},
		file_append: {
			node: {
				files: [{
					prepend: "var moment = require('moment');\n\n",
					append: "\n\nmodule.exports = moment;",
					input: 'lib/web/moment-calendarday.js',
					output: 'lib/node/moment-calendarday.js'
				}]
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		remapIstanbul: {
			build: {
				src: 'build/coverage/report-json/coverage-js.json',
				options: {
					reports: {
						'json': 'build/coverage/report-json/coverage-ts.json',
						'html': 'build/coverage/report-html',
					}
				}
			}
		},
		watch: {
			files: ['src/**/*.ts', 'test/**/*.ts'],
			tasks: ['compile']
		}
	});

	grunt.registerTask('default', ['ts', 'file_append', 'watch']);
	grunt.registerTask('compile', ['ts', 'file_append']);
	grunt.registerTask('test',    ['ts', 'file_append', 'karma' /*, 'remapIstanbul'*/]);
};

