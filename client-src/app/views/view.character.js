(function(window, $, _) {

    FC.CharacterView = Backbone.View.extend({
        el: '#content',
        template: _.template($('#charTemplate').html()),
        initialize: function(newChar) {
            this.model = newChar;
            this.render();
        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));

            return this;
        }
    });
}(window, jQuery, _));
