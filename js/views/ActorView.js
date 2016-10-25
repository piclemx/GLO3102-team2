define(
    [
        'backbone',
        'underscore',
        'text!js/templates/ActorTemplate.html',
        'js/models/ActorModel',
        'gapi',
        'js/views/MovieWidgetView',
        'jquery.fancybox'
    ],
    function (Backbone, _, ActorTemplate, ActorModel, Search, MovieWidgetView, fancybox) {
        var ActorView = Backbone.View.extend({
            el: '.page',
            initialize: function () {
                this.template = _.template(ActorTemplate);
                this.$movieList = $('#movies');
            },
            render: function (options) {
                var that = this;
                this.actor = new ActorModel({id: options.id});
                this.actor.fetch({
                    success: function (actor) {
                        Search.searchGoogle(actor.attributes.artistName, function (response) {
                            actor.getMovies(function (movies) {
                                if (response.items != undefined && response.items.length > 0) {
                                    var picture = response.items[0].link;
                                } else {
                                    var picture = undefined;
                                }
                                that.$el.html(that.template({actor: actor, picture: picture}));
                                movies.forEach(function (movie) {
                                    that.$movieList.append(MovieWidgetView.render({model: movie}).el);
                                }, this);
                                $('.fancybox').fancybox({
                                    padding: 0
                                });
                            });
                        });
                    }
                });
            }
        });
        return ActorView;
    }
);
