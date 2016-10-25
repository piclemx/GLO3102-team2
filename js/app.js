requirejs.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
        jquery: {
            exports: '$'
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        'jquery.fancybox': {
            deps: ['jquery']
        },
        'jquery.highlight': {
            deps: ['jquery']
        },
        slick: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: 'node_modules/jquery/dist/jquery',
        'jquery.cookie': 'node_modules/jquery.cookie/jquery.cookie',
        'jquery.fancybox': 'node_modules/fancybox/dist/js/jquery.fancybox.pack',
        'jquery.highlight': 'node_modules/jquery-highlight/jquery.highlight',
        slick: 'node_modules/slick-carousel/slick/slick.min',
        bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
        underscore: 'node_modules/underscore/underscore',
        backbone: 'node_modules/backbone/backbone',
        text: 'node_modules/text/text',
        crypto: 'node_modules/crypto-js/crypto-js',
        gravatar: 'js/lib/gravatar/GravatarGenerator',
        gapi: 'js/lib/googleapis/Search'
    }
});

require(
    ['jquery', 'backbone', 'js/router', 'js/general/User'],
    function ($, Backbone, Router, User) {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if (!originalOptions.url.match('^js/templates')) {
                options.url = 'http://umovie.herokuapp.com' + options.url;
            }
        });

        var sync = Backbone.sync;
        Backbone.sync = function (method, model, options) {
            options.beforeSend = function (xhr) {
                if (User.isLoggedIn()) {
                    xhr.setRequestHeader('Authorization', User.get('token'));
                }
            };
            sync(method, model, options);
        };

        Backbone.View.prototype.destroyView = function () {
            this.undelegateEvents();
            this.$el.empty();
        };

        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        Router.initialize();
    }
);
