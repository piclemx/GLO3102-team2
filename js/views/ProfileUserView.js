define(
    [
        'jquery',
        'js/views/ProfileView',
        'underscore',
        'js/general/User',
        'text!js/templates/UserTemplate.html',
        'text!js/templates/UserWatchlistsTemplate.html',
        'text!js/templates/UserFollowingTemplate.html',
        'js/models/UserModel',
        'js/collections/WatchlistCollection',
        'js/views/MessageView'
    ],
    function ($, ProfileView, _, User, UserTemplate, UserWatchlistsTemplate, UserFollowingTemplate,
              UserModel, WatchlistCollection, MessageView) {
        var ProfileUserView = ProfileView.extend({
            initialize: function (id) {
                var self = this;
                this.template = _.template(UserTemplate);
                this.watchlistsTemplate = _.template(UserWatchlistsTemplate);
                this.followingTemplate = _.template(UserFollowingTemplate);
                this.loginUser = new UserModel({id: User.get('id')});
                this.watchlists = new WatchlistCollection();
            },
            render: function (options) {
                var self = this;

                var showUserData = function () {
                    var isFollowing = self.loginUser.isFollowing(self.user.id);
                    self.$el.html(self.template({
                        user: self.user,
                        currentUser: false,
                        isFollowing: isFollowing
                    }));
                    self.renderFollowing();
                    self.watchlists.user = self.user;
                    self.watchlists.fetch({
                        success: function () {
                            self.renderWatchlists(self.watchlists.models);
                        }
                    });
                };

                if (_.isUndefined(options)) {
                    // The render method was called without parameter
                    // we use the current user of the view.
                    options = {id: self.user.get('id')}
                }

                if (!_.isEmpty(options) && _.has(options, 'id')) {
                    self.user = new UserModel({id: options.id});
                    this.loginUser.fetch({
                        success: function () {
                            self.user.fetch({
                                success: showUserData
                            });
                        }
                    });
                }
            }
        });

        return ProfileUserView;
    }
);
