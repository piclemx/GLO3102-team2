define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/general/User',
        'text!js/templates/LoginTemplate.html',
        'js/models/LoginModel',
        'js/views/MenuView',
        'js/views/MessageView',
        'jquery.cookie'
    ],
    function ($, Backbone, _, User, LoginTemplate, LoginModel, MenuView, MessageView) {
        var LoginView = Backbone.View.extend({
            initialize: function () {
                this.template = _.template(LoginTemplate);
                this.messageView = new MessageView.View();
            },
            el: '.page',
            events: {
                'submit #login-form': 'login',
                'click #sign-up': 'signUp'
            },
            login: function (ev) {
                ev.preventDefault();

                var self = this;
                var loginDetails = $(ev.currentTarget).serializeObject();

                User.save(loginDetails, {
                    success: function (model, response, options) {
                        $.cookie('access_token', model.get('token'));
                        MenuView.render();
                        Backbone.history.navigate('/', {trigger: true});
                    },
                    error: function (model, response, options) {
                        if (response.status === 401) {
                            self.messageView.error('The combination of email and password is unauthorized.');
                        } else {
                            self.messageView.error(response.statusText);
                        }
                    }
                });
            },
            signUp: function (ev) {
                ev.preventDefault();
                Backbone.history.navigate('/signup', {trigger: true});
            },
            render: function () {
                MenuView.clear();
                $(this.el).html(this.template);
                this.messageView.$el = this.$('.login-message');
            }
        });
        return LoginView;
    }
);
