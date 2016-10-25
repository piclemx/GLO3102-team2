define(['jquery', 'backbone', 'text!js/templates/HomeTemplate.html', 'slick', 'bootstrap'],
    function ($, Backbone, HomeTemplate) {
        var HomeView = Backbone.View.extend({
            initialize: function () {
                this.template = HomeTemplate;
            },
            el: '.page',
            events: {
                'click .view-movie': 'viewMovie',
                'click .view-tvshow': 'viewTvShow',
                'click .view-actor': 'viewActor'
            },
            viewMovie: function (ev) {
                ev.preventDefault();
                var id = $(ev.currentTarget).data('movie-id');
                Backbone.history.navigate('/movie/' + id, {trigger: true});
            },
            viewTvShow: function (event) {
                event.preventDefault();
                var id = $(event.currentTarget).data('tvshow-id');
                Backbone.history.navigate('/tvshow/' + id, {trigger: true});
            },
            viewActor: function (event) {
                var id = $(event.currentTarget).data('actor-id');
                Backbone.history.navigate('/actor/' + id, {trigger: true});
            },
            render: function () {
                var self = this;
                $(self.el).html(self.template);

                $('.carousel').carousel({
                    interval: 5000
                });

                $('.multiple-items').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    arrows: true,
                    dots: true,
                    centerMode: true,
                    focusOnSelect: true,
                    variableWidth: true
                });
            }
        });
        return HomeView;
    }
);
