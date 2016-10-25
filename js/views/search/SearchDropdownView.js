define(
    [
        'backbone',
        'underscore',
        'text!js/templates/search/SearchDropdownTemplate.html',
        'js/collections/SearchCollection'
    ],
    function (Backbone, _, SearchDropdownTemplate, SearchCollection) {
        return Backbone.View.extend({
            template: _.template(SearchDropdownTemplate),
            initialize: function (parent, models, el) {
                var that = this;
                this.parent = parent;
                this.models = models;
                this.active_models = {};

                models.forEach(function (model) {
                    that.active_models[model.getKey()] = true;
                });

                this.results = [];
                this.setElement(el);
                this.searching = false;
                this.listenTo(parent, 'autocomplete', this.search);
                this.listenTo(parent, 'filterResults', this.filter);
                this.delegateEvents(_.extend(this.events, {
                    'click .search-dropdown-option': 'optionSelected',
                }));
            },
            render: function () {
                this.$el.html(this.template({
                    results: this.results,
                }));
            },
            search: function (ev) {
                var that = this;
                var query = this.parent.getQuery();

                if (this.searching || query.length < 3) {
                    return;
                }

                this.searching = true;
                setTimeout(function () {
                    that.searching = false;
                }, 500);

                this.results = [];

                this.$el.find('.search-dropdown-wrapper').show();

                this.models.forEach(function (model) {
                    if (!that.active_models[model.getKey()]) {
                        return;
                    }
                    var collection = new SearchCollection(model.constructor, query);

                    collection.fetch({
                        success: function (searchResults) {
                            var result = searchResults;
                            searchResults.models.forEach(function (model) {
                                if (that.results.length < 10) {
                                    that.results.push(model);
                                }
                            });
                            that.render();
                        }
                    });
                });

            },
            filter: function (options) {
                if (_.has(options, 'genre') && _.has(options, 'value')) {
                    this.active_models[options.genre] = options.value;
                }
            },
            optionSelected: function (ev) {
                this.hide();
                var new_value = this.$(ev.currentTarget).attr('value');
                this.parent.setSearchBarValue(new_value);
                this.parent.triggerSearch(ev);
            },
            hide: function () {
                this.$el.find('.search-dropdown-wrapper').hide();
            }
        });
    }
);
