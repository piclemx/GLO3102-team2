define([
    'js/models/UserModel',
    'js/models/FollowModel',
    'js/models/WatchlistMovieModel',
    'js/views/MessageView'
], function (UserModel, FollowModel, WatchlistMovieModel, MessageView) {
    var util = {};

    util.isEmail = function (email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };

    util.formatDate = function (date) {
        return new Date(date).toLocaleDateString();
    };

    util.changeImageSize = function (url, size) {
        return url.replace('100x100bb.jpg', size + 'x' + size + 'bb.jpg');
    };

    util.followUserWithID = function (idToFollow, successCallback, errCallback) {
        var userModel = new UserModel({id: idToFollow});
        var followModel = new FollowModel();
        userModel.fetch({
            success: function (userToAdd) {
                followModel.save(userToAdd.toJSON(), {
                    success: function () {
                        if (successCallback) {
                            successCallback();
                        }
                    },
                    error: function (model, response) {
                        if (errCallback) {
                            errCallback(model, response);
                        }
                    }
                });
            }
        });
    };
    util.unFollowUserWithID = function (idToUnfollow, successCallback, errCallback) {
        var followModel = new FollowModel({id: idToUnfollow});
        followModel.destroy({
            success: function () {
                if (successCallback) {
                    successCallback();
                }
            },
            error: function (model, response) {
                if (errCallback) {
                    errCallback(model, response);
                }
            }
        });
    };

    util.defaultAPIError = function (model, response) {
        MessageView.error('A problem occurred with the API. Try again later.');
    };

    util.addToWatchlist = function (watchlistID, watchlistMovie) {
        watchlistMovie.fetch({
            success: function () {
                if (watchlistID == '') {
                    MessageView.error('You must select a watchlist');
                    return;
                }
                var watchlistMovieModel = new WatchlistMovieModel(watchlistID);
                if (typeof(watchlistMovieModel) !== 'undefined') {
                    var successCallback = function () {
                        MessageView.success('The movie has been added to your watchlist.');
                    };

                    var errorCallback = function (model, response) {
                        MessageView.success(
                            'Could not add the movie to your watchlist. ' +
                            response.statusText);
                    };
                    watchlistMovieModel.addToWatchlist(watchlistMovie, successCallback, errorCallback);
                } else {
                    MessageView.error('You don\'t have this watchlist.');
                }
            },
            error: function (model, response) {
                util.defaultAPIError(model, response);
            }
        });
    };
    return util;
});
