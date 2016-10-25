define(
    [
        'backbone',
        'underscore',
        'jquery',
        'text!js/templates/search/GlobalSearchTemplate.html',
        'js/views/search/SearchSectionView',
        'js/views/search/SearchDropdownView',
        'js/models/ActorModel',
        'js/models/MovieModel',
        'js/models/UserModel',
        'js/models/TvShowModel',
        'js/collections/SearchCollection',
        'text!js/templates/CheckboxItemTemplate.html'
    ],
    function (Backbone, _, $, SearchTemplate, SearchSectionView, SearchDropdownView, ActorModel, MovieModel,
              UserModel, TvShowModel, SearchCollection, CheckboxItemTemplate) {
        var models = [
            new ActorModel(),
            new UserModel(),
            new MovieModel(),
            new TvShowModel()
        ];

        function updateQueryName(query) {
            var query_holder = $('#query-holder');
            if (query && query !== '') {
                query_holder.text(query);
                query_holder.parent().show();
            } else {
                query_holder.parent().hide();
            }
        }

        var view = Backbone.View.extend({
            el: '.page',
            events: {
                'submit .search-form': 'triggerSearch',
                'change .checkbox-inline': 'filterResults',
                'keyup .search-box': 'triggerAutocomplete',
                'focusout .search-box': 'hideSearchDropdown',
            },
            initialize: function () {
                this.template = _.template(SearchTemplate);
                this.checkboxTemplate = _.template(CheckboxItemTemplate);
                this.genreFilters = {};
            },
            render: function (nextCallback) {
                this.genres = {};
                this.$el.html(this.template({
                    'dataTypes': models
                }));
                this.$genresContainer = $('.genres').first();
                var that = this;
                var section_containers = this.$el.find('.section');
                $.each(models, function (i, model) {
                    var view = new SearchSectionView(that, model, section_containers[i]);
                    that.listenTo(view, 'searchDone', that.sectionSearchDone);
                    view.render();
                });
                updateQueryName();
                if (nextCallback) {
                    nextCallback();
                }

                this.$dropdownContainer = this.$el.find('.search-dropdown').first();
                this.dropdownView = new SearchDropdownView(this, models, this.$dropdownContainer);
            },
            sectionSearchDone: function (ev) {
                var that = this;
                $('a[href*="' + ev.key + '"]>.badge').text(ev.length);
                if (_.has(ev, 'genres')) {
                    $.each(ev.genres, function (i, genre) {
                        if (!that.genreFilters.hasOwnProperty(genre)) {
                            that.$genresContainer.append(that.checkboxTemplate({
                                'label': genre
                            }));
                            that.genreFilters[genre] = true;
                        }
                    });
                }
            },
            triggerSearch: function (ev, query) {
                this.hideSearchDropdown(ev, 200);
                this.$genresContainer.empty();
                if (!query) {
                    query = this.getQuery();
                }
                var event = {
                    query: query
                };
                $.each(models, function (i, model) {
                    event[model.getKey()] = $('#' + model.getKey() + '-toggle').is(':checked')
                });
                this.notifySearchEvent(event);
            },
            triggerAutocomplete: function () {
                this.trigger('autocomplete');
            },
            filterResults: function (ev) {
                this.trigger('filterResults', {
                    'genre': ev.currentTarget.parentElement.textContent.trim().toLowerCase(),
                    'value': ev.currentTarget.checked,
                });
            },
            notifySearchEvent: function (ev) {
                Backbone.history.navigate('search/' + encodeURIComponent(ev.query));
                updateQueryName(ev.query);
                this.trigger('search', ev);
            },
            getQuery: function () {
                return this.$el.find('.search-box').first().val();
            },
            setSearchBarValue: function (new_value) {
                this.$el.find('.search-box').val(new_value);
            },
            hideSearchDropdown: function(ev, timeout=500){
                var that = this;
                // A timeout is required in the case where the user
                // clicks in a selection of the dropdown menu
                setTimeout(function () {
                    that.dropdownView.hide();
                }, timeout);
            }
        });
        return view;
    }
);
