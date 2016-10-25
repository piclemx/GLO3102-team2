define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/general/User',
        'text!js/templates/MenuTemplate.html',
        'js/models/LogoutModel',
        'js/views/search/SearchDropdownView',
        'js/models/ActorModel',
        'js/models/UserModel',
        'js/models/MovieModel',
        'js/models/TvShowModel',
    ],
    function ($, Backbone, _, User, MenuTemplate, LogoutModel, SearchDropdownView,
              ActorModel, UserModel, MovieModel, TvShowModel) {
        var models = [
            new ActorModel(),
            new UserModel(),
            new MovieModel(),
            new TvShowModel()
        ];
        var MenuView = Backbone.View.extend({
            el: '.menu',
            events: {
                'click .view-watchlists': 'viewWatchlists',
                'click .view-home': 'viewHome',
                'click .btn-menu-search': 'triggerSearch',
                'click .logout': 'logout',
                'keyup .search-box': 'triggerAutocomplete',
                'focusout .search-box': 'hideSearchDropdown',
            },
            initialize: function () {
                this.template = _.template(MenuTemplate);
            },
            render: function () {
                $(this.el).html(this.template({user: User}));
                this.$dropdownContainer = this.$el.find('.search-dropdown').first();
                this.dropdownView = new SearchDropdownView(this, models, this.$dropdownContainer);
            },
            clear: function () {
                $(this.el).html('');
            },
            viewWatchlists: function (ev) {
                ev.preventDefault();
                Backbone.history.navigate('/watchlists', {trigger: true});
            },
            viewHome: function (ev) {
                ev.preventDefault();
                Backbone.history.navigate('', {trigger: true});
            },
            triggerSearch: function (ev) {
                ev.preventDefault();
                this.hideSearchDropdown(ev, 300);
                Backbone.history.navigate('/search/' + $('#menu-search-bar').val(), {trigger: true});
            },
            logout: function () {
                var logout = new LogoutModel();
                logout.fetch();
                $.removeCookie('access_token');
                User.clear({silent: true});
                Backbone.history.navigate('/login', {trigger: true});
            },
            getQuery: function () {
                return this.$el.find('.search-box').first().val();
            },
            triggerAutocomplete: function () {
                this.trigger('autocomplete');
            },
            setSearchBarValue: function (new_value) {
                this.$el.find('.search-box').val(new_value);
            },
            hideSearchDropdown: function(ev, timeout=500){
                var that = this;
                setTimeout(function () {
                    that.dropdownView.hide();
                }, timeout);
            },
        });
        return new MenuView();
    }
);
