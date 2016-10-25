define(
    [
        'backbone',
        'underscore',
        'js/general/User',
        'text!js/templates/WatchlistsTemplate.html',
        'js/models/WatchlistModel',
        'js/collections/WatchlistCollection',
        'js/views/MessageView',
    ],
    function (Backbone, _, User, watchlistsTemplate, WatchlistModel, WatchlistCollection, MessageView) {
        var WatchlistView = Backbone.View.extend({
            el: '.page',
            events: {
                'click .delete-watchlist': 'removeWatchlist'
            },

            initialize: function () {
                this.template = _.template(watchlistsTemplate);
                _.bindAll(this, 'render');
            },

            render: function () {
                var self = this;
                self.collection = new WatchlistCollection(User)
                self.collection.fetch({
                    success: function (watchlists) {
                        self.$el.html(self.template({watchlists: watchlists.models}));
                    }
                });
            },
            removeWatchlist: function (event) {
                event.preventDefault();
                var self = this;
                var watchlistID = $(event.currentTarget).data('id');
                var watchlistModel = new WatchlistModel({id: watchlistID});
                this.collection.remove(watchlistModel);
                watchlistModel.destroy({
                    success: function () {
                        MessageView.success('Watchlist removed sucessfully.');
                        self.render();
                    },
                    error: function (error) {
                        MessageView.error('Could not remove the watchlist. ' + error.message);
                    }
                });
            }
        });

        return WatchlistView;
    }
);
