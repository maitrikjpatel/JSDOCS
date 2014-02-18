module.exports = function(grunt) {

    var SRC_JS = "src/js/";
    var DEST_JS = "assets/js/";
    var SRC_CSS = "src/css/";
    var DEST_CSS = "assets/css/";

    grunt.loadNpmTasks('grunt-docco');

    grunt.initConfig({
        // check JS with JSlint
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            files: [
                SRC_JS + "!(**disabled)/!(**disabled)/!(*boilerplate).js",
                SRC_JS + "!(**libs)/!(*boilerplate).js",
                SRC_JS + "Main.js"
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                unused: false,
                globals: {
                    $: true,
                    jQuery: true,
                    Modernizr: true,
                    console: true,
                    alert: true,
                    App: true,
                    Backbone: true,
                    _: true
                }
            }

        },

        concat: {
            options: {
                banner: "/*! /////////////////////////\n* Generated by <%= pkg.name %> - <%= grunt.template.today('yyyy-mm-dd hh:mm') %>  \n* DO NOT MODIFY DIRECTLY, look for source files in " + SRC_JS + ". \n/////////////////////////*/\n\n\n"
            },
            scripts: {
                src: [
                    SRC_JS + "libs/underscore.js",
                    SRC_JS + "libs/backbone.js",
                    SRC_JS + "models/!(*boilerplate).js",
                    SRC_JS + "collections/!(*boilerplate).js",
                    SRC_JS + "views/!(*boilerplate).js",
                    SRC_JS + "!(**disabled)/!(**disabled)/!(*boilerplate).js",
                    SRC_JS + "!(**disabled)/!(*boilerplate).js",
                    SRC_JS + "Main.js"
                ],
                dest: DEST_JS + "scripts.min.js"
            }
        },

        uglify: {
            scripts: {
                src: [
                    SRC_JS + "libs/underscore.js",
                    SRC_JS + "libs/backbone.js",
                    SRC_JS + "models/!(*boilerplate).js",
                    SRC_JS + "collections/!(*boilerplate).js",
                    SRC_JS + "views/!(*boilerplate).js",
                    SRC_JS + "!(**disabled)/!(**disabled)/!(*boilerplate).js",
                    SRC_JS + "!(**disabled)/!(*boilerplate).js",
                    SRC_JS + "Main.js"
                ],
                dest: DEST_JS + "scripts.min.js"
            },

            modernizr: {
                src: [SRC_JS + "modernizr*.js"],
                dest: DEST_JS + "modernizr.min.js"
            },

            options: {
                preserveComments: 'some'
            }

        },


        less: {

            development: {
                options: {
                    paths: SRC_CSS,
                },

                src: [
                    SRC_CSS + "styles.*ss",
                    SRC_CSS + "normalize.*ss",
                    SRC_CSS + "core.*ss",
                    SRC_CSS + "!(*disabled).*ss",
                    SRC_JS + "plugins/!(**disabled)/!(*disabled).*ss"
                ],

                dest: DEST_CSS + "styles.css"

            },

            production: {
                options: {
                    paths: SRC_CSS,
                    yuicompress: true
                },
                src: [
                    SRC_CSS + "styles.*ss",
                    SRC_CSS + "normalize.*ss",
                    SRC_CSS + "core.*ss",
                    SRC_CSS + "!(*disabled).*ss",
                    SRC_JS + "plugins/!(**disabled)/!(*disabled).*ss"
                ],

                dest: DEST_CSS + "styles.css"
            }
        },

        watch: {

            scripts: {
                files: [
                    SRC_JS + "!(modernizr*).js",
                    SRC_JS + "models/!(*boilerplate).js",
                    SRC_JS + "collections/!(*boilerplate).js",
                    SRC_JS + "views/!(*boilerplate).js",
                    SRC_JS + "**/*.js"
                ],
                tasks: ["scripts", "docs"]
            },

            modernizr: {
                files: [SRC_JS + "modernizr*.js"],
                tasks: ["modernizr"]
            },

            styles: {
                files: [
                    SRC_CSS + "*.*ss",
                    SRC_JS + "plugins/**/*.*ss"
                ],
                tasks: ["styles"]
            },
        },

        // docco: {
        //   script: {
        //     src: [
        //         SRC_JS + "**/*.js",
        //         SRC_JS + "*.js"
        //     ],
        //     dest: "docs/"
        //   }
        // },

        docco: {
            debug: {
                src: [
                    SRC_JS + "**/*.js",
                    SRC_JS + "*.js"
                ],
                options: {
                    output: 'docs/'
                }
            }
        }

        strip: {
            prod: {
                src: [
                    DEST_JS + "scripts.min.js",
                    DEST_JS + "modernizr.min.js"
                ],
                options: {
                    inline: true,
                    nodes: ["console", "debug"]
                }
            }
        }


    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-docco");
    grunt.loadNpmTasks("grunt-strip");

    //grunt default will lint script and concat script files, minify modernizr, compile less for dev
    grunt.registerTask("default", ["jshint", "concat", "uglify:modernizr", "less:development", "docco", "watch"]);
    // this task lints and compiles script files only
    grunt.registerTask("scripts", ["jshint", "concat"]);
    // this task minifies modernizr
    grunt.registerTask("modernizr", ["uglify:modernizr"]);
    // this task minifies styles
    grunt.registerTask("styles", ["less:development"]);
    //this task creates docs
    grunt.registerTask("docs", ["docco"]);
    // this task packages all files for production
    grunt.registerTask("prod", ["jshint", "uglify", "less:production", "strip"]);

};