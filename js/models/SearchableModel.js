define(
    [
        'backbone'
    ],
    function (Backbone) {
        return Backbone.Model.extend({
            initialize: function (key, title, is_user, is_movie, link_base_uri, link_id_property, result_title_property) {
                this.key = key;
                this.title = title;
                this.is_user = is_user;
                this.is_movie = is_movie;
                this.link_base_uri = link_base_uri;
                this.link_id_property = link_id_property;
                this.result_title_property = result_title_property;
            },
            getKey: function () {
                return this.key;
            },
            getTitle: function () {
                return this.title;
            },
            getGenre: function () {
                return this.get('primaryGenreName');
            },
            isMovie: function () {
                return this.is_movie;
            },
            isUser: function () {
                return this.is_user;
            },
            getResultTitle: function () {
                return this.get(this.result_title_property);
            },
            getLinkUrl: function () {
                return this.link_base_uri + this.get(this.link_id_property);
            }
        });
    }
);
