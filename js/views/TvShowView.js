define(
    [
        'jquery',
        'jquery.highlight',
        'backbone',
        'underscore',
        'text!js/templates/TvShowTemplate.html',
        'text!js/templates/TvShowEpisodesTemplate.html',
        'js/models/TvShowModel',
        'js/collections/EpisodeCollection',
        'gapi'
    ],
    function ($, Highlight, Backbone, _, TvShowTemplate, TvShowEpisodeTemplate, TvShowModel, EpisodeCollection, Search) {
        var TvShowView = Backbone.View.extend({
            initialize: function () {
                this.template = _.template(TvShowTemplate);
                this.episodesTemplate = _.template(TvShowEpisodeTemplate);
                this.search = '';
            },
            el: '.page',
            events: {
                'keyup #search-episode': 'searchEpisode'
            },
            render: function (id) {
                var self = this;
                this.id = id;

                this.tvShowModel = new TvShowModel({id: id});
                this.tvShowModel.fetch({
                    success: function (tvshow) {
                        $(self.el).html(self.template({tvshow: tvshow}));
                        Search.searchYoutube(tvshow.get('collectionName') + ' Preview', function (response) {
                            $('#preview').prop('src', response);
                        });
                        self.renderEpisode(id);
                    }
                });
            },
            renderEpisode: function (id) {
                var self = this;
                var episodeCollection = new EpisodeCollection(id);
                episodeCollection.fetch({
                    success: function () {
                        $('#episodes')
                            .html(self.episodesTemplate({episodes: episodeCollection.search(self.search)}))
                            .highlight(self.search);
                        self.renderFancybox(episodeCollection);
                    }
                });
            },
            searchEpisode: function (e) {
                this.search = $(e.target).val();
                this.renderEpisode(this.id);
            },
            renderFancybox: function (episodeCollection) {
                $('.episodeBox').each(function () {
                    var episode = episodeCollection.findWhere({
                        trackId: $(this).data('episodeid')
                    });
                    $(this).fancybox({
                        beforeShow: function () {
                            Search.searchYoutube(episode.get('artistName') + ' ' + episode.get('trackName'), function (response) {
                                $('#previewEpisode' + episode.get('trackId')).prop('src', response);
                            });
                        }
                    });
                });
            }
        });
        return TvShowView;
    }
);
