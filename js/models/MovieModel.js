define(['underscore', 'js/models/SearchableModel', 'js/general/Util'],
    function (_, SearchableModel, Util) {
        var movieModel = SearchableModel.extend({
            urlRoot: '/movies',
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
            initialize: function () {
                SearchableModel.prototype.initialize.apply(this, [
                    'movies',
                    'Movies',
                    false,
                    true,
                    'movie/',
                    'trackId',
                    'trackName'
                ]);
            },
            parse: function (response) {
                var result;
                if (!_.has(response, 'results')) {
                    //it's not a collection so return the result itself
                    result = response;
                } else {
                    result = _.first(response.results);
                }
                return result;
            },
            getReleaseDate: function () {
                return Util.formatDate(this.get('releaseDate'));
            },
            getCover: function (size) {
                return Util.changeImageSize(this.get('artworkUrl100'), size);
            }
        });

        return movieModel;
    }
);
