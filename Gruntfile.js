module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');

	require('time-grunt')(grunt);

	grunt.initConfig({
		typescript: {
			base: {
				src: ['src/calendarday/**/*.ts', 'src/test/**/*.ts'],
				dest: 'build/test.js',
				options: {
					module: "commonjs",
					references: ['src/typings/**/*.d.ts']
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		watch: {
			files: 'src/**/*.ts',
			tasks: ['typescript']
		}
	});

	grunt.registerTask('default', ['typescript', 'watch']);
	grunt.registerTask('compile', ['typescript']);
	grunt.registerTask('test', ['typescript', 'karma']);
};

