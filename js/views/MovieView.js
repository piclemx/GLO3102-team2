define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/general/User',
        'text!js/templates/MovieTemplate.html',
        'js/models/MovieModel',
        'js/collections/WatchlistCollection',
        'gapi',
        'js/models/WatchlistMovieModel',
        'js/views/MessageView',
        'js/general/Util'
    ],
    function ($, Backbone, _, User, MovieTemplate, MovieModel, WatchlistCollection, Search, WatchlistMovieModel, MessageView, Util) {
        var MovieView = Backbone.View.extend({
            initialize: function () {
                this.template = _.template(MovieTemplate);
            },
            el: '.page',
            events: {
                'submit #add-to-watchlist-form': 'addToWatchlist'
            },
            addToWatchlist: function (ev) {
                ev.preventDefault();
                var watchlistID = $(ev.currentTarget).find('#watchlist').val();
                Util.addToWatchlist(watchlistID, this.movie);
            },
            render: function (options) {
                var self = this;
                var fetchWatchlistsSuccess = function (watchlists) {
                    $(self.el).html(self.template({movie: self.movie, watchlists: watchlists.models}));
                    Search.searchYoutube(self.movie.get('trackName') + ' Preview', function (response) {
                        $('#preview').prop('src', response);
                    });
                };

                var fetchMovieSuccess = function () {
                    self.watchlists = new WatchlistCollection(User);
                    self.watchlists.fetch({
                        success: fetchWatchlistsSuccess
                    });
                };

                self.movie = new MovieModel({id: options.id});
                self.movie.fetch({
                    success: fetchMovieSuccess
                });
            }
        });
        return MovieView;
    }
);
