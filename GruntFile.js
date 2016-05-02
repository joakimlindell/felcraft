module.exports = function(grunt) {

    // FelCraft Grunt Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['client-src/styles/*.css'],
                dest: 'public/css/felcraft.css'
            },
            bb: {
                src: ['client-src/app/collections/*.*.js', 'client-src/app/models/*.*.js', 'client-src/app/views/*.*.js'],
                dest: 'public/js/lib/felcraft-bb.js'
            },
            js: {
                src: ['client-src/app/FC.js', 'client-src/app/router.js'],
                dest: 'public/js/lib/felcraft-core.js'
            }
        },
        cssmin: {
            css: {
                src: 'public/css/felcraft.css',
                dest: 'public/css/felcraft.min.css'
            }
        },
        uglify: {
            js: {
                src: 'public/js/lib/felcraft-bb.js',
                dest: 'public/js/lib/felcraft-bb.min.js'
            },
            jscore: {
                src: 'public/js/lib/felcraft-core.js',
                dest: 'public/js/lib/felcraft-core.min.js'
            }

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

    grunt.registerTask('default', ['concat', 'cssmin', 'uglify','clean']);

};
