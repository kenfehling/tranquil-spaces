/*jshint strict: true */
/*global module */

module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['app/js/*.js'],
            tasks: ['browserify']
        },
        browserify: {
            dist: {
                files: {
                    'bundle.js': ['app/js/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
};