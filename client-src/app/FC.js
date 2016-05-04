_.extend(window, {
    FC: null
});

(function(window, document, $, _) {
    FC = function() {
        // Object Variables
        this.view_instances = {};
        this.model_instances = {};
        this.collection_instances = {};
        this.main_ele = '#content';
        this.default_route = 'new';
        this.character = null;
    };

    FC.prototype = {
        set_options: function(options) {
            var scope = this;
            $.each(options, function(index, option) {
                scope[index] = option;
            });
            this.$el = $(this.main_ele);
        },
        get: function(object) {
            var item;
            if (object.view) {
                item = this.get_view(object.view, object.model, object.collection);
            } else if (object.model) {
                item = this.get_model(object.model);
            } else if (object.collection) {
                item = this.get_collection(object.collection);
            }
            return item;
        },

        alert: function(alert_data) {
            var header = this.get({ view: { name: 'header' } });
            header.trigger('alert', alert_data);
        },
        init: function(options) {
            if (!_.isUndefined(this.Lib)) {
                _.extend(this, new this.Lib());
            }
            var _super = Backbone.View.prototype.remove;
            Backbone.View.prototype.remove = function() {
                this.trigger('remove');
                return _super.apply(this, arguments);
            };

            this.set_options(options);
            if (window.location.hash == undefined || window.location.hash == '') {
                window.location.hash = this.default_route;
            }
            this.active_router = new this.router();
            Backbone.history.start();
        }
    };

    // Global objects for our views/models/collections/events
    _.extend(FC.prototype, {
        view_definitions: {},
        model_definitions: {},
        collection_definitions: {}
    });
}(window, document, jQuery, _));
