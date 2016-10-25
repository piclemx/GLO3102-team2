define(['backbone'],
    function (Backbone) {
        var LogoutModel = Backbone.Model.extend({
            urlRoot: '/logout'
        });

        return LogoutModel;
    }
);
