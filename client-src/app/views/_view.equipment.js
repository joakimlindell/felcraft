(function(window, $, _) {

    FC.EquipmentView = Backbone.View.extend({
        el: '#page-content',
        type: 'equipmentView',
        events: {
        },
        equipment: [],
        template: _.template($('#equipmentTemplate').html()),
        initialize: function(equipment) {
            console.log("Initializing Equipment SubView");
            this.equipment = equipment;
        },
        render: function() {
            console.log("Render equipment called!");
            this.$el.html(this.template({equipment: this.equipment}));
            return this;
        },
        destroy: function() {
            console.log("Destroying equipmentView with cid: ", this.id);
            this.unbind();
            //this.remove();
        }
    });
}(window, jQuery, _));
