define([
    'jquery',
    'underscore',
    'Backbone',
    'views/sampleView'
], function ($, _, Backbone, SampleView) {

    var AppRouter = Backbone.Router.extend({

        currentView : null,

        routes: {
            '' : 'home'
        },

        // Example view.
        home: function () {
            if (!this.sampleView) {
                this.sampleView = new SampleView();
                this.showView(this.sampleView, '.container'); // Call common method to initialize it and render it.
            }
        },

       /* Method on which to call new views.
        * The close() method takes care of disposing the current view.
        *
        * {view}  The View to insert.
        * {where} The name of the DOM element on which to insert the view.
        */
        showView: function (view, where) {
            if (!view || !where) {
                throw new Error('Missing an element on showView method.');
            }

            if (this.currentView) {
                /* The close() method is defined in every View's prototype (see utils.js) */
                this.currentView.close();
            }

            $(where).html(view.render().el);
            this.currentView = view;

            return view;
        }
    }),

    // Initialize the router
    initialize = function () {
        var appRouter = new AppRouter();

        appRouter.bind('all', function (route) {
            // This will trigger every time a new route is executed.
            // You can fire the route itself, or anything else.
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});