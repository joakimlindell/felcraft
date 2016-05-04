(function(window, $, _) {

    FC.TalentsView = Backbone.View.extend({
        el: '#page-content',
        type: 'talentsView',
        events: {
        },
        armoryTalents: [],
        userTalents: [],
        glyphs: [],
        template: _.template($('#talentsTemplate').html()),
        initialize: function(talents, glyphs) {
            console.log("Initializing Talents SubView");
            this.talentMatrix = talents;
            this.glyphs = glyphs;
        },
        render: function() {
            console.log("Render talents called!");
            this.$el.html(this.template({talents: this.talents, glyphs: this.glyphs}));
            return this;
        },
        destroy: function() {
            console.log("Destroying TalentView with cid: ", this.id);
            this.unbind();
            //this.remove();
        }
    });
}(window, jQuery, _));
