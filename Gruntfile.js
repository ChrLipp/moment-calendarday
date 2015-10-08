module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');

	require('time-grunt')(grunt);

	grunt.initConfig({
		typescript: {
			lib: {
				src: ['src/**/*.ts'],
				dest: 'lib/moment-calendarday.js',
				options: {
					module: "commonjs",
					references: ['typings/**/*.d.ts']
				}
			},
			test: {
				src: ['test/**/*.ts'],
				dest: 'test/test.js',
				options: {
					module: "commonjs",
					references: ['typings/**/*.d.ts']
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
			tasks: ['typescript']
		}
	});

	grunt.registerTask('default', ['typescript', 'watch']);
	grunt.registerTask('compile', ['typescript']);
	grunt.registerTask('test', ['typescript', 'karma']);
};

