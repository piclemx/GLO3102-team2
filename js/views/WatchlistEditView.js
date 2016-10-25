define(
    [
        'backbone',
        'underscore',
        'js/general/User',
        'text!js/templates/WatchlistEditTemplate.html',
        'js/collections/WatchlistCollection',
        'js/models/WatchlistModel',
        'js/views/MessageView',
    ],
    function (Backbone, _, User, editWatchlistTemplate, WatchlistCollection, WatchlistModel, MessageView) {
        var WatchlistEditView = Backbone.View.extend({
            el: '.page',
            initialize: function () {
                var self = this;
                self.template = _.template(editWatchlistTemplate);
                _.bindAll(this, 'render');
            },
            events: {
                'submit .edit-watchlist-form': 'saveWatchlist',
                'click .delete': 'deleteWatchlist'
            },
            saveWatchlist: function (ev) {
                ev.preventDefault();
                var self = this;
                var watchlistDetail = $(ev.currentTarget).serializeObject();
                if (typeof(self.watchlist) === 'undefined') {
                    self.watchlist = new WatchlistModel({id: watchlistDetail.id});
                }
                var nameTrim = watchlistDetail.name.trim();
                if (!nameTrim || nameTrim === '') {
                    MessageView.error('The name must not be is empty');
                } else {
                    if (self.collection.findWhere({'name': nameTrim})) {
                        MessageView.error('The name must not be is empty');
                    } else {
                        self.watchlist.set({name: nameTrim});
                        self.watchlist.save({'name': nameTrim}, {
                            success: function () {
                                MessageView.success('Watchlist saved sucessfully.');
                                Backbone.history.navigate('/watchlists', {trigger: true});
                            }
                        });
                    }
                }
            },
            deleteWatchlist: function (ev) {
                ev.preventDefault();
                this.watchlist.destroy({
                    success: function () {
                        MessageView.success('Watchlist removed sucessfully.');
                        Backbone.history.navigate('/watchlists', {trigger: true});
                    },
                    error: function (model, response) {
                        MessageView.error('Could not remove the watchlist. ' + response.statusText);
                    },
                });
            },
            render: function (options) {
                var self = this;
                self.collection = new WatchlistCollection(User);
                self.collection.fetch();
                if (options.id) {
                    self.watchlist = new WatchlistModel({id: options.id});
                    self.watchlist.fetch({
                        success: function (watchlist) {
                            $(self.el).html(self.template({watchlist: watchlist}));
                        }
                    });
                } else {
                    $(self.el).html(self.template({watchlist: null}));
                }
            }
        });

        return WatchlistEditView;
    }
);
