define(
    [
        'backbone',
        'underscore',
        'js/models/WatchlistModel'
    ],
    function (Backbone, _, WatchlistModel) {
        var WatchlistCollection = Backbone.Collection.extend({
            model: WatchlistModel,
            url: '/watchlists',

            initialize: function (user) {
                this.user = user;
            },

            parse: function (response) {
                var self = this;
                var watchlists = _.filter(response, function (watchlist) {
                    if (_.has(watchlist.owner, 'id')) {
                        return watchlist.owner.id === self.user.get('id');
                    } else {
                        return false;
                    }
                });

                return watchlists;
            }
        });

        return WatchlistCollection;
    }
);
