define([
    'jquery',
    'underscore',
    'Backbone'
], function ($, _, Backbone) {

    var AppRouter = Backbone.Router.extend({

        currentView : null,

        routes: {
            '' : 'home'
        },

        // Example view. You may delete this.
        // Verify if it exists first, then call our show method to render it.
        home: function () {
            require([
                'require',
                'views/sampleView'
            ], _.bind(function (require, SampleView) {
                if (!this.sampleView) {
                    this.sampleView = new SampleView();
                }
                this.showView(this.sampleView, '.container');
            }, this));
        },

       /* Method on which to call new views.
        * The close() method takes care of disposing the current view.
        *
        * {view}   [View]    The View to insert.
        * {where}  [String]  The name of the DOM element on which to insert the view.
        * {append} [Boolean] Append to the {where} element instead of replace.
        */
        showView: function (view, where, append) {
            if (!view || !where) {
                throw new Error('Missing an element on showView method.');
            }

            if (this.currentView) {
                /* The close() method is defined in every View's prototype (see utils.js) */
                this.currentView.close();
            }

            if (append !== true) {
                $(where).html(view.render().el);
                this.currentView = view;
            } else {
                $(where).append(view.render().el);
            }

            return view;
        }
    }),

    /**
     * Initialize the router
     * @public
     */
    initialize = function () {
        var appRouter = new AppRouter();

        appRouter.bind('all', function (route) {
            // This will trigger every time a new route is executed.
            // You can fire the route itself, or anything else.
        });

        window.appRouter = appRouter;

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});