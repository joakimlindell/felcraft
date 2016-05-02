(function(window, $, _) {

    FC.CharacterView = Backbone.View.extend({
        el: '#content',
        template: _.template($('#charTemplate').html()),
        initialize: function(newChar) {
            this.model = newChar;
            console.log("Initializing Character View with ", this.model);
            if(this.model.get('isVerified')) {
                this.render();
            } else {
                this.model.on("change:isVerified", this.verifyChanged, this);
                this.model.verify(); // verify character
            }
        },
        verifyChanged: function() {
            this.render(); // re-render
        },
        render: function() {

            if(this.model.get('isVerified')) {
            $(document).attr('title', this.model.get('name')+"@"+this.model.get('server')+" | FelCraft");
            }
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
}(window, jQuery, _));
