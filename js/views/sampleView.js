define([
    'jquery',
    'underscore',
    'Backbone',
    'text!templates/header.html',
    'collections/sampleCollection'
], function ($, _, Backbone, headerTemplate, SampleCollection) {
    
    var AppView = Backbone.View.extend({

        tagName: 'header',
        className: 'header',

        events: {
            
        },

        initialize: function () {
            this.element = this.$el; // grab and cache the current element (header.header)
            this.collection = new SampleCollection();
        },

        render: function () {
            var template = _.template(headerTemplate);
            this.element.html(template);
            return this;
        }
    });

    return AppView;
});