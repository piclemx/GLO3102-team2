define(['backbone', 'js/general/Util', 'gravatar'],
    function (Backbone, Util, Gravatar) {
        var LoginModel = Backbone.Model.extend({
            sync: function (method, model, options) {
                if (method === 'read') {
                    options.url = '/tokenInfo';
                } else {
                    options.url = '/login';
                }
                return Backbone.sync(method, model, options);
            },
            validate: function (attrs) {
                if (!attrs.email || attrs.email === '' || !Util.isEmail(attrs.email)) {
                    return 'Please enter a valid email.';
                }
                if (!attrs.password || attrs.password === '') {
                    return 'Please enter a valid password.';
                }
            },
            isLoggedIn: function () {
                return this.has('token');
            },
            gravatarUrl: function () {
                return Gravatar.generate(this.attributes.email);
            }
        });

        return LoginModel;
    }
);
