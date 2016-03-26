module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		vendorScriptFiles: [
			'vendor/angular/angular.min.js',
			'vendor/ngSmoothScroll/angular-smooth-scroll.min.js',
			'vendor/wowjs/dist/wow.min.js',
			'vendor/angular-simple-logger/dist/angular-simple-logger.js',
			'vendor/ui-leaflet/dist/ui-leaflet.js'
		],

		personalScriptFiles: [
			'public/js/main.js'
		],

		stylesheetFiles:[
			'vendor/bootstrap/dist/css/bootstrap.min.css',
			'vendor/bootstrap/dist/css/bootstrap-theme.min.css',
			'vendor/animate.css/animate.min.css',
			'vendor/leaflet/dist/leaflet.css'
		],

		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},

			build: ['Gruntfile.js', 'public/js/**/*.js']
		},

		clean: {
			dist: {
				src: 'dist'
			},

			css: {
				src: 'public/css/*.css'
			}
		},

		copy: {
			dist:  {
				cwd: 'public',
				src: ['**/*', '!vendor/**/*', '!js/**/*.js','!**/less/*.less', '<%= vendorScriptFiles %>', '<%= stylesheetFiles %>'],
				dest: 'dist',
				expand: true
			}
		},

		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh-MM-ss") %> */\n',
				sourceMap: false
			},

			dist: {
				files: {
					'dist/css/<%= pkg.name %>.min.css' : ['dist/css/<%= pkg.name %>.css']
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh-MM-ss") %> */',
				sourceMap: false,
				mangle: false
			},
			dist: {
				src: ['<%= personalScriptFiles %>'],
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},

		htmlbuild: {
			dist: {
				src: 'public/index.html',
				dest: 'dist',
				relative: true,
				options: {
					beautify: false,
					relative: true,
					logOptions: true,

					scripts: {
						bundle: {
							cwd: 'dist',
							files: ['<%= vendorScriptFiles %>', 'js/<%= pkg.name %>.min.js']
						}
					},

					styles: {
						bundle: ['dist/css/<%= pkg.name %>.min.css']
					}
				}
			},
		},

		less: {
			build: {
				src: 'public/less/<%= pkg.name %>.less',
				dest: 'public/css/<%= pkg.name %>.css'
			}
		},

		watch: {
			options: {
				livereload: true
			},
			stylesheets: {
				files: 'public/less/*.less',
				tasks: ['clean:css', 'less:build']
			},
			scripts: {
				files: ['Gruntfile.js', 'public/js/**/*.js'],
				tasks: ['jshint:build']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html-build');

	grunt.registerTask('default',['watch']);
	grunt.registerTask('dist', ['jshint:build','less:build', 'clean:dist', 'copy:dist', 'uglify:dist','cssmin:dist', 'htmlbuild:dist' ]);
};