define(
    [
        'backbone',
        'underscore',
        'text!js/templates/search/SearchSectionTemplate.html',
        'js/collections/SearchCollection',
        'js/views/search/SearchResultView',
        'text!js/templates/search/NoResultTemplate.html',
        'js/general/User',
        'js/models/UserModel',
        'text!js/templates/search/SearchWatchlistTemplate.html',
        'js/collections/WatchlistCollection'
    ],
    function (Backbone, _, SearchSectionTemplate, SearchCollection, ResultView, NoResultTemplate, User, UserModel, SearchWatchlistTemplate, WatchlistCollection) {
        var searchSectionView = Backbone.View.extend({
            template: _.template(SearchSectionTemplate),
            initialize: function (parent, model, el) {
                this.setElement(el);
                this.title = model.getTitle();
                this.model = model;
                this.currentUser = new UserModel({id: User.get('id')});
                this.watchlists = new WatchlistCollection(this.currentUser);
                this.searchWatchlistTemplate = _.template(SearchWatchlistTemplate);
                this.listenTo(parent, 'search', this.search);
                this.listenTo(parent, 'filterResults', this.filterSection);
            },
            render: function (options) {
                var that = this;
                this.currentUser.fetch({
                    success: function (user) {
                        that.$el.html(that.template({
                            'title': that.title
                        }));
                        var results_container = that.$el.find('.results-container').first();
                        if (options && _.has(options, 'query')) {
                            var collection = new SearchCollection(that.model.constructor, options.query);
                            collection.fetch({
                                    success: function (searchResults) {
                                        $(results_container).empty();
                                        if (searchResults.length > 0) {
                                            $.each(that.getResultViews(searchResults, user), function (i, resultView) {
                                                results_container.append(resultView.render().$el);
                                            });
                                        } else {
                                            $(results_container).html(NoResultTemplate);
                                        }

                                        if (that.model.getKey() === 'movies') {
                                            that.renderWatchlists();
                                        }
                                        that.trigger('searchDone', {
                                            'length': searchResults.length,
                                            'key': that.model.getKey(),
                                            'genres': searchResults.getGenres()
                                        });
                                    }
                                }
                            );
                        } else {
                            $(results_container).html(NoResultTemplate);
                            that.trigger('searchDone', {
                                'length': 0,
                                'key': that.model.getKey(),
                                'genres': []
                            });
                        }
                    }
                });
            },
            renderWatchlists: function () {
                var that = this;
                this.watchlists.fetch({
                    success: function (results) {
                        var containers = $(that.el).find('.search-result');
                        if (containers.length > 0 && results.length > 0) {
                            containers.append(that.searchWatchlistTemplate({
                                'watchlists': results.models
                            }));
                        }
                    }
                });
            },
            search: function (ev) {
                if (ev[this.model.getKey()]) {
                    this.render({
                        'query': ev.query
                    });
                } else {
                    this.render();
                }
            },
            filterSection: function (options) {
                this.trigger('filterResult', options);
            },
            getResultViews: function (results, user) {
                var views = [];
                for (var i in results.models) {
                    views.push(new ResultView({
                        'section': this,
                        'result': results.models[i],
                        'currentUser': user
                    }));
                }
                return views;
            }
        });

        return searchSectionView;
    }
);
