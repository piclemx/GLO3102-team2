define([
    'js/lib/googleapis/GoogleConfiguration'
], function (GoogleConfiguration) {
    var exports = {};

    exports.loadSearch = function (callback) {
        var addSearchKey = function () {
            gapi.client.setApiKey(GoogleConfiguration.customsearch);
            if (callback !== undefined) {
                callback();
            }
        };

        gapi.client.load('customsearch', 'v1', addSearchKey);
    };

    exports.loadYoutube = function (callback) {
        var addYoutubeKey = function () {
            gapi.client.setApiKey(GoogleConfiguration.youtube);
            if (callback !== undefined) {
                callback();
            }
        };

        gapi.client.load('youtube', 'v3', addYoutubeKey);
    };

    exports.searchGoogle = function (query, callback) {
        var search = function () {
            var request = gapi.client.search.cse.list({
                searchType: 'image',
                imgSize: 'medium',
                imgType: 'face',
                fileType: 'jpg',
                num: 1,
                cx: '002682109668023150654:hbcyh-oble8',
                q: query
            });
            request.execute(function (response) {
                callback(response);
            });
        }
        exports.loadSearch(search);
    };

    exports.searchYoutube = function (query, callback) {
        var search = function () {
            var request = gapi.client.youtube.search.list({
                part: 'snippet',
                maxResults: 1,
                q: query
            });

            request.execute(function (response) {
                var videoId = response.result.items[0].id.videoId;
                callback('https://www.youtube.com/embed/' + videoId);
            });
        }
        exports.loadYoutube(search);
    };
    return exports;
});
