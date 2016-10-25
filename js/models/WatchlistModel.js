define(['backbone'],
    function (Backbone) {
        var WatchlistModel = Backbone.Model.extend({
            urlRoot: '/watchlists',
            defaults: {
                'name': '',
                'movies': [],
                'owner': {}
            }
        });

        return WatchlistModel;
    }
);
