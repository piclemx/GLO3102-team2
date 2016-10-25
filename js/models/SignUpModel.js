define(['backbone', 'js/general/Util'],
    function (Backbone, Util) {
        var SignUpModel = Backbone.Model.extend({
            urlRoot: '/signup',
            validate: function (attrs) {
                if (!attrs.name || attrs.name === '') {
                    return 'Please enter a valid name.';
                }
                if (!attrs.email || attrs.email === '' || !Util.isEmail(attrs.email)) {
                    return 'Please enter a valid email.';
                }
                if (!attrs.password || attrs.password === '') {
                    return 'Please enter a valid password.';
                }
            }
        });

        return SignUpModel;
    }
);
