// Configuring require.js dependencies.
require.config({
    paths: {
        jquery: 'libs/jquery-min',
        underscore: 'libs/lodash', // Using loadash instead of underscore.
        Backbone: 'libs/backbone',
        text: 'libs/text',
        order: 'libs/order',
        templates: '../templates' // A shortcut
    },
    // Backbone should only be loaded after its dependencies
    shim: {
        'Backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    // This prevents the annoying caching while developing.
    // Warning: you should remove this when switching to production!
    urlArgs : 'bust=?' + (+ new Date())
});

// Start the application
require([
    'app',
    'utils'
], function (App, Utils) {
    Utils.initialize();
    App.initialize();

});