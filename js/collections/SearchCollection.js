define(['backbone', 'underscore'],
    function (Backbone, _) {
        var searchCollection = Backbone.Collection.extend({
            initialize: function (model, query) {
                this.model = model;
                this.query = query;
            },
            url: function () {
                //this is ugly but we are forced to do it. see issue #13 of UMovie
                if (this.model.prototype.urlRoot === '/tvshows/season') {
                    return '/search/tvshows/seasons/?q=' + this.query;
                }
                return '/search' + this.model.prototype.urlRoot + '?q=' + this.query;
            },
            parse: function (response) {
                if (_.has(response, 'results')) {
                    return response.results;
                }
                return response;
            },
            getGenres: function () {
                var genres = {};
                this.each(function (model) {
                    if (model.getGenre()) {
                        genres[model.getGenre()] = true;
                    }
                });
                return Object.keys(genres);
            }
        });

        return searchCollection;
    }
);
