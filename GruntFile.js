module.exports = function(grunt) {

    // FelCraft Grunt Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['client-src/styles/*.css'],
                dest: 'public/css/felcraft.css'
            }
        },
        cssmin: {
            css: {
                src: 'public/css/felcraft.css',
                dest: 'public/css/felcraft.min.css'
            }
        },
        uglify: {
 
        },
        clean: {
            js: ["public/js/lib/*.js", "!public/js/lib/*.min.js"],
            css: ["public/css/felcraft.css"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['concat', 'cssmin', 'clean']);

};
