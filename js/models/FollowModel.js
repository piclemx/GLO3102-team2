define(['backbone'], function (Backbone) {
    var FollowModel = Backbone.Model.extend({
        urlRoot: '/follow',

        sync: function (method, model, options) {
            if (method === 'update') {
                method = 'create';
                options.url = model.urlRoot;
            }
            return Backbone.sync(method, model, options);
        }
    });

    return FollowModel;
});
