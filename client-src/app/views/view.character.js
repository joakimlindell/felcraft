(function(window, $, _) {

    FC.CharacterView = Backbone.View.extend({
        tagName: 'div',
        className: 'charList',
        template: _.template($('#charTemplate').html()),

        render: function() {
            this.$el.html(this.template(this.model.attributes));

            return this;
        }
    });
}(window, jQuery, _));
