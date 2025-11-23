module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                files: {
                    'dev/styles/main.css' : 'src/styles/main.less'
                }
            },
            production: {
                options: { compress: true },
                files: {
                    'dist/styles/main.min.css' : 'src/styles/main.less'
                }
            }
        },

        // ---- NOVO ---- //
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts/',
                        src: ['**/*.js'],
                        dest: 'dev/scripts/'
                    }
                ]
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development'],
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev'],
            },
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['copy:dev']
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDEREÇO_DO_JS',
                            replacement: './scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },

            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDEREÇO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        clean: ['prebuild'],
        uglify: {
            dist: {
                files: {
                    'dist/scripts/main.min.js': ['src/scripts/main.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Ambiente DEV
    grunt.registerTask('default', ['less:development', 'copy:dev', 'replace:dev', 'watch']);

    // Ambiente DIST
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}
