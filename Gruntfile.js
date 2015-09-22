module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');

	require('time-grunt')(grunt);

	grunt.initConfig({
		typescript: {
			base: {
				src: ['src/calendar/**/*.ts', 'src/test/**/*.ts'],
				dest: 'build/test.js',
				options: {
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
			files: '**/*.ts',
			tasks: ['typescript', 'karma']
		}
	});

	grunt.registerTask('default', ['typescript', 'karma']);
	grunt.registerTask('test', ['typescript', 'karma', 'watch']);
};

