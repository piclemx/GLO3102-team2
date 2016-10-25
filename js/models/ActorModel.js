define(
    [
        'underscore',
        'js/models/SearchableModel',
        'js/collections/MovieCollection'
    ],
    function (_, SearchableModel, MovieCollection) {
        var ActorModel = SearchableModel.extend({
            urlRoot: '/actors',
            initialize: function () {
                SearchableModel.prototype.initialize.apply(this, [
                    'actors',
                    'Actors',
                    false,
                    false,
                    'actor/',
                    'artistId',
                    'artistName'
                ]);
            },
            getMovies: function (callback) {
                var movies = new MovieCollection();
                movies.url = '/actors/' + this.id + '/movies';
                movies.fetch({
                    success: function (movies) {
                        callback(movies.models);
                    }
                });
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
            }
        });

        return ActorModel;
    }
);
