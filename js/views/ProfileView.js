define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/general/User',
        'text!js/templates/UserTemplate.html',
        'text!js/templates/UserWatchlistsTemplate.html',
        'text!js/templates/UserFollowingTemplate.html',
        'js/models/UserModel',
        'js/models/FollowModel',
        'js/collections/WatchlistCollection',
        'js/views/MessageView',
        'js/general/Util'
    ],
    function ($, Backbone, _, User, UserTemplate, UserWatchlistsTemplate, UserFollowingTemplate, UserModel,
              FollowModel, WatchlistCollection, MessageView, Util) {
        var ProfileView = Backbone.View.extend({
            initialize: function () {
                this.template = _.template(UserTemplate);
                this.watchlistsTemplate = _.template(UserWatchlistsTemplate);
                this.followingTemplate = _.template(UserFollowingTemplate);
                this.user = new UserModel({id: User.get('id')});
                this.watchlists = new WatchlistCollection(User);
            },
            el: '.page',

            events: {
                'click .following-panel .follow': 'follow',
                'click .following-panel .unfollow': 'unfollow',
                'click .user-section .follow': 'follow',
                'click .user-section .unfollow': 'unfollow',
            },
            render: function () {
                var self = this;
                self.user.fetch({
                    success: function () {
                        self.$el.html(self.template({user: self.user, currentUser: true, isFollowing: false}));
                        self.renderFollowing();
                        self.watchlists.fetch({
                            success: function () {
                                self.renderWatchlists(self.watchlists.models);
                            }
                        });
                    }
                });
            },
            renderWatchlists: function (watchlistsByOwner) {
                var self = this;
                var $watchlists = $('.page .watchlists-panel .panel-body');
                $watchlists.empty();
                if (_.isEmpty(watchlistsByOwner)) {
                    $watchlists.html('<p>No watchlist!</p>');
                } else {
                    watchlistsByOwner.forEach(function (watchlist) {
                        $watchlists.append(self.watchlistsTemplate({watchlist: watchlist}));
                    });
                }
            },
            renderFollowing: function () {
                var self = this;
                var $following = $('.page .following-panel .panel-body');
                $following.empty();
                if (_.isEmpty(self.user.get('following'))) {
                    $following.html('<p>Following Nobody!</p>');
                } else {
                    self.user.get('following').forEach(function (user) {
                        var isFollowing = self.user.isFollowing(user.id);
                        var model = new UserModel({id: user.id});
                        model.fetch({
                            success: function (follower) {
                                $following.append(self.followingTemplate({
                                    user: follower,
                                    currentUser: self.user,
                                    isFollowing: isFollowing
                                }));
                            }
                        });
                    });
                }
            },
            follow: function (ev) {
                ev.preventDefault();
                var self = this;
                Util.followUserWithID($(ev.currentTarget).data('id'), function () {
                    MessageView.success('User successfully added to your following list.');
                    self.render();
                }, function (model, response) {
                    MessageView.error('Could not add the user to your following list. ' + response.statusText);
                });
            },
            unfollow: function (ev) {
                var self = this;
                ev.preventDefault();
                Util.unFollowUserWithID($(ev.currentTarget).data('id'), function () {
                        MessageView.success('User successfully removed from your following list.');
                        self.render();
                    },
                    function (model, response) {
                        MessageView.error('Could not remove the user from your following list. ' + response.statusText);
                    });
            }

        });
        return ProfileView;
    }
);
