define(
    [
        'backbone',
        'underscore',
        'text!js/templates/WatchlistMoviesTemplate.html',
        'js/models/WatchlistModel',
        'js/models/WatchlistMovieModel',
        'js/views/MessageView',
    ],
    function (Backbone, _, WatchlistMoviesTemplate, WatchlistModel, WatchlistMovieModel, MessageView) {
        var WatchlistMoviesView = Backbone.View.extend({
            el: '.page',
            initialize: function () {
                this.template = _.template(WatchlistMoviesTemplate);
            },
            events: {
                'click .movie-remove': 'removeMovie'
            },
            render: function (options) {
                var self = this;

                if (options.id) {
                    self.watchlist = new WatchlistModel({id: options.id});
                    self.watchlist.fetch({
                        success: function (data) {
                            self.$el.html(self.template({movies: data.get('movies')}));
                        }
                    });

                }
            },

            removeMovie: function (ev) {
                var self = this;
                ev.preventDefault();
                var movieId = $(ev.currentTarget).data('movie-id');
                var watchlistMovie = new WatchlistMovieModel(self.watchlist.get('id'));
                watchlistMovie.set({id: movieId});
                watchlistMovie.destroy({
                    success: function (model, response) {
                        MessageView.success('Movie removed sucessfully.');
                        self.render({id: response.id});
                    },
                    error: function (model, response) {
                        MessageView.error('Could not remove the movie. ' + response.statusText);
                        self.render({id: self.watchlist.get('id')});
                    }
                });
            }

        });

        return WatchlistMoviesView;
    }
);
