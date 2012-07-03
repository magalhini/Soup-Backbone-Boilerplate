define([
    'jquery',
    'underscore',
    'Backbone'
], function ($, _, Backbone) {

    var initialize = function () {

        // Set a close() method on every view.
        Backbone.View.prototype.close = function () {
            this.off();
            this.remove();
        };
    };

    return {
        initialize: initialize
    };
});