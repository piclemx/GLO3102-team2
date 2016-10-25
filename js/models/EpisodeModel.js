define(['backbone', 'js/general/Util'],
    function (Backbone, Util) {
        var EpisodeModel = Backbone.Model.extend({
            parse: function (response) {
                return response;
            },
            getCover: function (size) {
                return Util.changeImageSize(this.get('artworkUrl100'), size);
            },
            getDurationInMinute: function () {
                return Math.round(this.get('trackTimeMillis') / 60000);
            }
        });

        return EpisodeModel;
    }
);
