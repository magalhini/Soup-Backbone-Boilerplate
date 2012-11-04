define([
    'jquery',
    'underscore',
    'Backbone'
], function ($, _, Backbone) {

    var initialize = function () {

        /*
         * Implements a dispose method on every view.
         */
        Backbone.View.prototype.close = function () {
            // Check if the view has its own dispose method first
            if (this.onClose) {
                this.onClose();
            }

            this.off();
            this.remove();
        };
    };

    return {
        initialize: initialize
    };
});