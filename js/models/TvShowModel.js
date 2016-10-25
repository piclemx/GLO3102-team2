define([
        'underscore',
        'js/models/SearchableModel',
        'js/general/Util',
    ],
    function (_, SearchableModel, Util) {
        var tvShowModel = SearchableModel.extend({
            urlRoot: '/tvshows/season',
            initialize: function () {
                SearchableModel.prototype.initialize.apply(this, [
                    'shows',
                    'TV Shows',
                    false,
                    false,
                    'tvshow/',
                    'collectionId',
                    'collectionName'
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

        return tvShowModel;
    }
);
