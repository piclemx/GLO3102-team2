define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!js/templates/search/SearchResultTemplate.html',
        'js/general/Util',
        'js/models/WatchlistMovieModel',
        'js/views/MessageView',
        'js/models/MovieModel'
    ],
    function ($, Backbone, _, SearchSectionTemplate, Util, WatchlistMovieModel, MessageView, MovieModel) {
        return Backbone.View.extend({
            template: _.template(SearchSectionTemplate),
            events: {
                'click .btn-search-follow': 'triggerFollow',
                'click .btn-search-unfollow': 'triggerUnfollow',
                'click .btn-watchlist': 'addToWatchlist'
            },
            tagName: 'div',
            className: 'list-group-item search-result',
            initialize: function (options) {
                this.result = options.result;
                this.user = options.currentUser;
                this.listenTo(options.section, 'filterResult', this.filter);
            },
            render: function () {
                this.$el.html(this.template({
                    user: this.user,
                    model: this.result,
                }));
                return this;
            },
            filter: function (options) {
                if (_.has(options, 'genre') && _.has(options, 'value')) {
                    if (this.result.getGenre() && this.result.getGenre().toLowerCase() === options.genre) {
                        this.toggleResult(options.value);
                    }
                }
            },
            triggerFollow: function (ev) {
                ev.preventDefault();
                var self = this;
                Util.followUserWithID($(ev.currentTarget).data('id'), function () {
                    self.user.fetch({
                        success: function () {
                            self.render();
                        }
                    });
                });
            },
            triggerUnfollow: function (ev) {
                ev.preventDefault();
                var self = this;
                Util.unFollowUserWithID($(ev.currentTarget).data('id'), function () {
                    self.user.fetch({
                        success: function () {
                            self.render();
                        }
                    });
                });
            },
            addToWatchlist: function (ev) {
                ev.preventDefault();
                var watchlistID = this.getWatchListID(ev);
                var movieID = this.getMovieId(ev);
                var movie = new MovieModel({
                    'id': movieID
                });
                Util.addToWatchlist(watchlistID, movie);
            },
            getWatchListID: function (ev) {
                return $(ev.currentTarget).parent().find('.search-movie-watchlists').val();
            },
            toggleResult: function (display) {
                if (display) {
                    this.$el.show();
                }
                else {
                    this.$el.hide();
                }
            },
            getMovieId: function (ev) {
                return $(ev.currentTarget).closest('div').find('a').attr('href').split('/')[1];
            }
        });
    }
);
