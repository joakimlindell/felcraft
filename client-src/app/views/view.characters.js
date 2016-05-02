(function(window, $, _) {
    FC.CharactersView = Backbone.View.extend({
        el: '#content',

        initialize: function(initialChars) {
            this.collection = new FC.Characters(initialChars);
            this.render();
        },

        render: function() {
            this.collection.each(function(item) {
                this.renderChar(item);
            }, this);
        },

        renderChar: function(item) {
            var charView = new FC.CharacterView({
                model: item
            });
            this.$el.append(charView.render().el);
        }
    });
}(window, jQuery, _));
