define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!js/templates/MessageTemplate.html',
    ],
    function ($, Backbone, _, MessageTemplate) {

        var MessageView = Backbone.View.extend({
            el: '.message',
            initialize: function () {
                this.template = _.template(MessageTemplate);
            },
            render: function (options) {
                this.$el.html(this.template({
                    message: options.message,
                    type: options.type,
                }));
                return this;
            },
            error: function (message) {
                this.render({
                    message: message,
                    type: 'danger',
                })
            },
            success: function (message) {
                this.render({
                    message: message,
                    type: 'success',
                })
            },
        });

        var mainView = new MessageView();

        return {
            error: function (message) {
                // This can not be simplified as
                //    error: main_view.error
                // because the function would not be called as a method of main_view
                // and `this` would not reference main_view.
                mainView.error(message);
            },
            success: function (message) {
                mainView.success(message);
            },
            View: MessageView,
        };
    }
);
