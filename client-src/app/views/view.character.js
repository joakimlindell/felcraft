(function(window, $, _) {

    FC.CharacterView = Backbone.View.extend({
        el: '#content',
        template: _.template($('#charTemplate').html()),
        initialize: function(newChar) {
            this.model = newChar;
            this.model.on("change:isVerified", this.verifyChanged, this);
            this.model.verify(); // verify character
        },
        verifyChanged: function() {
            this.render(); // re-render
            this.$el.append('<span style="color: yellow">VERFICATION SERVER RESPONDED: ' + this.model.get('isVerified')+'</span>');
        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));

            return this;
        }
    });
}(window, jQuery, _));
