// Configuring require.js dependencies.
require.config({
    paths: {
        jquery: 'libs/jquery-min',
        underscore: 'libs/lodash', // Using loadash instead of underscore.
        Backbone: 'libs/backbone',
        text: 'libs/text',
        order: 'libs/order',
        templates: '../templates'
    },
    // Backbone should only be loaded after its dependencies
    shim: {
        'Backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

// Start the application
require([
    'app',
    'utils'
], function (App, Utils) {
    Utils.initialize();
    App.initialize();

});