module.exports = function(grunt) {

    // Get external tasks
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-yui-compressor');
    grunt.loadNpmTasks('grunt-smushit');

    // Warn in which enviroment is going to compile
    grunt.log.writeln('\033[90m\nCompiling in \033[31m' + ((grunt.cli.tasks.length && grunt.cli.tasks[0] === 'production:prod') ? 'production' : 'development') + '\033[90m mode.\033[0m');

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',

        min: {
            dist: {
                src: ['public/libs/require.js'],
                dest: 'public/dist/libs/require.js'
            }
        },

        //  To learn more about using the server task, please refer to the code
        //  until documentation has been written.
        server: {
          // Ensure the favicon is mapped correctly.
          files: { "favicon.ico": "favicon.ico" },

          debug: {
            // Ensure the favicon is mapped correctly.
            files: "<config:server.files>",

            // Map `server:debug` to `debug` folders.
            folders: {
              "app": "dist/debug",
              "assets/js/libs": "dist/debug",
              "assets/css": "dist/debug"
            }
          },

      release: {
        // This makes it easier for deploying, by defaulting to any IP.
        host: "0.0.0.0",

        // Ensure the favicon is mapped correctly.
        files: "<config:server.files>",

        // Map `server:release` to `release` folders.
        folders: {
          "app": "dist/release",
          "assets/js/libs": "dist/release",
          "assets/css": "dist/release"
        }
      }
    },

        test: {
            files: ['test/**/*.js']
        },

        lint: {
            files: [
                'js/**/*.js'
            ]
        },

        watch: {
            files: '<config:lint.files>',
            tasks: 'lint test'
        },

        cssmin: {
            'dist': {
                'src': ['public/css/*.css'],
                'dest': 'public/dist/css/styles.min.css'
            }
        },

        requirejs: {
            baseUrl: 'public/js',
            // build directory path
            dir: 'public/dist/js',

            paths: {
                // Major libraries
                'jquery': '../libs/jquery-min',
                'underscore': '../libs/lodash',
                'backbone': '../libs/backbone',

                // Require.js plugins
                text: '../libs/text',
                templates: '../templates'
            },

            shim: {
                'Backbone': {
                    deps: ['underscore', 'jquery'],
                    exports: 'Backbone'
                }
            },

            // optimize javascript files with uglifyjs
            optimize: 'uglify',

            pragmas: {
                validation: true,
                development: true
            },

            // uglify options
            uglify: {
                'unsafe': true,
                'toplevel': true,
                'dead_code': true,
                'lift_vars': true
            },

            removeCombined: true,

            // Experimental
            findNestedDependencies: true,

            // Define our app model
            modules: [{
                name: 'main'
            }]

        },

        shell: {
            clean: {
                command: 'rm -r public/dist/js/*'
            },
            copyimages: {
                command: 'cp -r public/img public/dist/img'
            },
            copyassets: {
                command: 'cp -r public/assets public/dist/assets'
            }
        },

        smushit: {
            path: {
                src: 'public/dist/img'
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true
            },
            globals: {
                exports: true,
                module: true,
                define: true,
                require: true,
                Router: true
            }
        }
    });

    // Tasks
    grunt.registerTask('release', 'compile shell:copyassets min smushit');
    grunt.registerTask('build', 'shell:clean requirejs');
    grunt.registerTask('compile', 'shell:clean requirejs:dev cssmin shell:copyimages');
};