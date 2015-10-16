module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-karma');
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
					sourceMap: false,
					removeComments: false
				}
			},
			node: {
				src: ['src/export.ts'],
				outDir: 'lib/node',
				options: {
					module: "commonjs",
					references: ['typings/**/*.d.ts'],
					sourceMap: false,
					removeComments: false
				}
			},
			test: {
				src: ['test/**/*.ts'],
				out: 'build/test.js',
				options: {
					//module: "commonjs",
					references: ['typings/**/*.d.ts'],
					sourceMap: false,
					removeComments: false
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		watch: {
			files: ['src/**/*.ts', 'test/**/*.ts'],
			tasks: ['compile']
		}
	});

	grunt.registerTask('default', ['ts', 'watch']);
	grunt.registerTask('compile', ['ts']);
	grunt.registerTask('test', ['ts', 'karma']);
};

