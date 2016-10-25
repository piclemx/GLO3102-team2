define(
    [
        'backbone',
        'underscore',
        'text!js/templates/MovieWidgetTemplate.html',
        'js/models/MovieModel',
        'gapi'
    ],
    function (Backbone, _, MovieWidgetTemplate, MovieModel, Search) {
        var MovieWidgetView = Backbone.View.extend({
            initialize: function () {
                this.template = _.template(MovieWidgetTemplate);
            },
            render: function (options) {
                var that = this;
                Search.searchYoutube(options.model.attributes.trackName, function (response) {
                    //because '.movies' is loaded dynamically, using the el attribute does not seem to work..
                    $('.movies').append(that.template({movie: options.model, video: response}));
                });
                return this;
            }
        });
        return new MovieWidgetView();
    }
);
