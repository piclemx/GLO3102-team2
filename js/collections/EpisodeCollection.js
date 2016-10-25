define(['js/models/EpisodeModel'],
    function (EpisodeModel) {
        var EpisodeCollection = Backbone.Collection.extend({
            model: EpisodeModel,
            initialize: function (id) {
                this.seasonId = id;
            },
            url: function () {
                return '/tvshows/season/' + this.seasonId + '/episodes';
            },
            parse: function (response) {
                return response.results;
            },
            search: function (value) {
                return this.models.filter(function (episode) {
                    if (value === '') return true;

                    return episode.get('trackName').toLowerCase().indexOf(value.toLowerCase()) > -1 ||
                        episode.get('longDescription').toLowerCase().indexOf(value.toLowerCase()) > -1;
                });
            }
        });

        return EpisodeCollection;
    }
);
