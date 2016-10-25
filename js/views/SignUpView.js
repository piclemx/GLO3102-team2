define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!js/templates/SignUpTemplate.html',
        'js/models/SignUpModel',
        'js/views/MessageView',
    ],
    function ($, Backbone, _, SignUpTemplate, SignUpModel, MessageView) {
        var SignUpView = Backbone.View.extend({
            initialize: function () {
                this.template = _.template(SignUpTemplate);
                this.messageView = new MessageView.View();
            },
            el: '.page',
            events: {
                'submit #sign-up-form': 'signUp',
                'click #login': 'login'
            },
            signUp: function (ev) {
                var self = this;

                ev.preventDefault();

                var signUpDetails = $(ev.currentTarget).serializeObject();
                var signUp = new SignUpModel();

                signUp.on('invalid', function (model, error) {
                    self.messageView.error(error);
                });

                signUp.save(signUpDetails, {
                    success: function (model, response, options) {
                        // Use the global MessageView because we redirect to the login view
                        MessageView.success('Your account has been created successfully.');
                        Backbone.history.navigate('/login', {trigger: true});
                    },
                    error: function (model, response) {
                        if (response.status === 500) {
                            self.messageView.error('The email is already taken.');
                        } else {
                            self.messageView.error(response.statusText);
                        }
                    }
                });
            },
            login: function (ev) {
                ev.preventDefault();
                Backbone.history.navigate('/login', {trigger: true});
            },
            render: function () {
                $(this.el).html(this.template);
                this.messageView.$el = this.$('.signup-message');
            }
        });
        return SignUpView;
    }
);
