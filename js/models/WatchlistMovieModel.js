define(['backbone'],
    function (Backbone) {
        var WatchlistMovieModel = Backbone.Model.extend({
            urlRoot: '/watchlists/:id/movies',
            defaults: {
                'wrapperType': '',
                'kind': '',
                'trackId': null,
                'artistName': '',
                'trackName': '',
                'trackCensoredName': '',
                'trackViewUrl': '',
                'previewUrl': '',
                'artworkUrl30': '',
                'artworkUrl60': '',
                'artworkUrl100': '',
                'collectionPrice': 0,
                'trackPrice': 0,
                'trackRentalPrice': 0,
                'collectionHdPrice': 0,
                'trackHdPrice': 0,
                'trackHdRentalPrice': 0,
                'releaseDate': '',
                'collectionExplicitness': '',
                'trackExplicitness': '',
                'trackTimeMillis': 0,
                'country': '',
                'currency': '',
                'primaryGenreName': '',
                'contentAdvisoryRating': '',
                'longDescription': '',
                'radioStationUrl': ''
            },
            initialize: function (watchlistID) {
                this.urlRoot = '/watchlists/' + watchlistID + '/movies';
            },
            addToWatchlist: function (movie, success, error) {
                var movieToSave = movie.toJSON();
                delete movieToSave.id;
                this.save(movieToSave, {
                    success: success,
                    error: error,
                    type: 'POST'
                });
            }
        });

        return WatchlistMovieModel;
    }
);
