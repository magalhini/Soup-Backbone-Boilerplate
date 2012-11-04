define([
    'jquery',
    'underscore',
    'Backbone',
    'router'
], function($, _, Backbone, Router) {

    var initialize = function () {
        Router.initialize(); // Call the initialize method on Backbone's router
    };

    return {
        initialize: initialize
    };
});