define(['backbone', 'js/models/MovieModel'],
    function (Backbone, MovieModel) {
        var MovieCollection = Backbone.Collection.extend({
            model: MovieModel,
            url: '/movies',
            parse: function (response) {
                return response.results;
            }
        });

        return MovieCollection;
    }
);
