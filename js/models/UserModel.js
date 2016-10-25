define([
    'js/models/SearchableModel',
    'underscore',
    'gravatar'
], function (SearchableModel, _, Gravatar) {
    var userModel = SearchableModel.extend({
        urlRoot: '/users',
        defaults: {
            'id': 0,
            'email': '',
            'name': '',
            'following': []
        },
        initialize: function () {
            SearchableModel.prototype.initialize.apply(this, [
                'users',
                'Users',
                true,
                false,
                'profile/',
                'id',
                'email'
            ]);
        },
        parse: function (response) {
            var result;
            if (!_.has(response, 'results')) {
                //it's not a collection so return the result itself
                result = response;
            } else {
                result = _.first(response.results);
            }
            result.gravatar = Gravatar.generate(result.email);
            return result;
        },
        isFollowing: function (id) {
            var isFollowing;
            if (this.get('id') === id) {
                isFollowing = -1;
            }
            isFollowing = _.some(this.get('following'), function (user) {
                return user.id === id;
            });

            return isFollowing;
        }
    });

    return userModel;
});
