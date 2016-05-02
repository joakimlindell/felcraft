(function(window, $, _) {

    /* NewCharSplashView - The entry point of the application allowing the
     * user to input their server, region and character name (class in the future).
     *
     * No associated model at this point.
     * */
    FC.NewCharSplashView = Backbone.View.extend({
        el: '#content',
        template: _.template($('#newCharSplash').html()),

        initialize: function(initialChar) {
            this.model = new FC.Character(initialChar);
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });
}(window, jQuery, _));