'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('flipbook.json'),

        www: 'app',
        dist: 'prod',
        
        jsout:'js/flipbook.min.js',
        cssout:'css/flipbook.css',
        compimg:'img/',

        js:'js/**/*.js',
        scss:'sass/**/*.scss',
        img:'img/**/*.{png,jpg,gif}',

        sass: {
          deve: {
            options: {
              style: 'nested'
            },
            files: {
              '<%= www %>/<%= cssout %>': '<%= dist %>/<%= scss %>'
            },
          },
          dist: {
            options: {
              style: 'compressed'
            },
            files: {
              '<%= www %>/<%= cssout %>': '<%= dist %>/<%= scss %>'
            },
          },
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),

                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                freeze: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                indent: 4,
                white: false,
                quotmark: 'single',
                trailing: true,
                jquery: true,
                browser: true,
                debug: false,
                devel: false,
                predef: [
                    'require',
                    'module'
                ]
            },
            gruntfile: {
                options: {
                    node: true
                },
                src: 'Gruntfile.js'
            },
            dev: {
                options: {
                    devel: true,
                    debug: true,
                    unused: false
                },
                src: [
                    '<%= dist %>/<%= js %>'
                ]
            }
        },

        uglify: {
            options: {
                report: 'min'
            },
            compile: {
                files: {
                    '<%= www %>/<%= jsout %>': ['<%= dist %>/<%= js %>']
                }
            }
        },

        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8,
                rename: false
            },
            assets: {
                files: [{
                    src: ['<%= dist %>/*.html']
                }]
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= www %>/<%= cssout %>',
                        '<%= www %>/<%= jsout %>',
                        '<%= www %>/**/*.php'
                    ]
                },
                options: {
                    watchTask: true
                }
            }
        },
        
        parallel:{
          grunt: {
            options: {
              grunt: true
            },
            tasks: ['sass:dist', 'uglify', 'jshint']
          },
        },

        watch: {
          configFiles:{
            files:['<%= dist %>/<%= scss %>','<%= dist %>/<%= js %>','<%= www %>/**/*.php'],
            options:{
              livereload: true,
            },
          },
          sass:{
            files:['<%= dist %>/<%= scss %>'],
            tasks: ['sass:deve'],
            options:{
              livereload:true,
            },
          },
          javascript:{
            files:['<%= dist %>/<%= js %>','Gruntfile.js'],
            tasks: ['uglify','jshint'],
            options:{
              livereload:true,
            },
          },
        }
    });

    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    grunt.registerTask('dev', ['parallel','watch']);
    grunt.registerTask('uploads', ['sass:deve','uglify']);
    grunt.registerTask('default', ['sass:dist','uglify']);

};