module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        less: {
            dev: {
                files: {
                    "dist/css/estilo.css": "src/less/style.less"
                }
            }
        },

        uglify: {
            target: {
                files: {
                    "dist/js/app.min.js": ["src/js/app.js"]
                }
            }
        },

        watch: {
            styles: {
                files: ["src/less/**/*.less"], // observa todos os arquivos LESS
                tasks: ["less"],               // roda a tarefa LESS ao mudar
                options: {
                    spawn: false,
                }
            },
            scripts: {
                files: ["src/js/**/*.js"],    // observa todos os arquivos JS
                tasks: ["uglify"],            // roda a tarefa Uglify ao mudar
                options: {
                    spawn: false,
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["less", "uglify", "watch"]);
};
