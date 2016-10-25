define(
    [
        'backbone',
        'js/general/User',
        'js/views/MenuView',
        'js/views/HomeView',
        'js/views/LoginView',
        'js/views/SignUpView',
        'js/views/MovieView',
        'js/views/TvShowView',
        'js/views/ActorView',
        'js/views/WatchlistsView',
        'js/views/WatchlistEditView',
        'js/views/WatchlistMoviesView',
        'js/views/search/GlobalSearchView',
        'js/views/ProfileView',
        'js/views/ProfileUserView'
    ],
    function (Backbone, User, MenuView, HomeView, LoginView, SignUpView, MovieView, TvShowView,
              ActorView, WatchlistsView, WatchlistEditView, WatchlistMoviesView, SearchView, ProfileView, ProfileUserView) {
        var Router = Backbone.Router.extend({
            routes: {
                '': 'home',
                'login': 'login',
                'signup': 'signUp',
                'watchlists': 'watchlists',
                'watchlist/edit/:id': 'editWatchlist',
                'watchlist/new': 'editWatchlist',
                'watchlist/movies/:id': 'showWatchlistMovies',
                'actor/:id': 'actor',
                'movie/:id': 'movie',
                'tvshow/:id': 'tvshow',
                'search/:query': 'searchFor',
                'search/': 'searchPage',
                'profile': 'showProfile',
                'profile/:id': 'showProfileById'
            },

            execute: function (callback, args, name) {
                var loggedIn = User.isLoggedIn();

                if (!loggedIn && name !== 'login' && name !== 'signUp') {
                    this.validateToken(callback, args, function () {
                        this.navigate('/login', {trigger: true});
                    });
                    return false;
                } else if (loggedIn && (name === 'login' || name === 'signUp')) {
                    this.navigate('/', {trigger: true});
                    return false;
                }

                if (callback) {
                    callback.apply(this, args);
                }
            },

            validateToken: function (successCallback, successArgs, errorCallback) {
                var token = $.cookie('access_token');

                if (token) {
                    var self = this;

                    User.set('token', token);
                    User.fetch({
                        success: function (model, response, options) {
                            if (successCallback) {
                                MenuView.render();
                                successCallback.apply(self, successArgs);
                            }
                        },
                        error: function (model, response, options) {
                            errorCallback.apply(self);
                        }
                    });
                } else {
                    errorCallback.apply(this);
                }
            },

            initializeView: function (View, optionsView, optionsRender) {
                if (this.currentView) {
                    this.currentView.destroyView();
                }

                this.currentView = new View(optionsView);
                this.currentView.render(optionsRender);
            },
            home: function () {
                this.initializeView(HomeView);
            },
            login: function () {
                this.initializeView(LoginView);
            },
            signUp: function () {
                this.initializeView(SignUpView);
            },
            watchlists: function () {
                this.initializeView(WatchlistsView);
            },
            editWatchlist: function (id) {
                this.initializeView(WatchlistEditView, {}, {id: id});
            },
            actor: function (id) {
                this.initializeView(ActorView, {}, {id: id});
            },
            movie: function (id) {
                this.initializeView(MovieView, {}, {id: id});
            },
            tvshow: function (id) {
                this.initializeView(TvShowView, {}, id);
            },
            showWatchlistMovies: function (id) {
                this.initializeView(WatchlistMoviesView, {}, {id: id});
            },
            searchPage: function () {
                this.initializeView(SearchView);
            },
            searchFor: function (query) {
                var that = this;
                this.initializeView(SearchView, {}, function () {
                    if (query) {
                        that.currentView.triggerSearch(undefined, query);
                    }
                });
            },
            showProfile: function () {
                this.initializeView(ProfileView);
            },
            showProfileById: function (id) {
                this.initializeView(ProfileUserView, id, {id: id});
            }
        });

        var initialize = function () {
            var router = new Router();
            Backbone.history.start()
        };

        return {
            initialize: initialize
        }
    }
);
