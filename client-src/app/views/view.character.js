(function(window, $, _) {

    FC.CharacterView = Backbone.View.extend({
        el: '#content',
        activeSubView: null,
        events: {
            'click .fc-app-menuLink': 'menuItemClicked'
        },
        template: _.template($('#charTemplate').html()),
        initialize: function(newChar) {
            this.model = newChar;
            console.log("Initializing Character View with ", this.model);
            if (this.model.get('isVerified')) {
                this.render();
            } else {
                this.model.on("change:isVerified", this.verifyChanged, this);
                this.model.verify(); // verify character
            }
        },
        verifyChanged: function() {
            this.render(); // re-render
        },
        menuItemClicked: function(e) {
            this.$('#side-menu li').each(function(i) {
                $(this).removeClass('active');
            });
            $('#fc-side-equip-drop').removeClass('in');
            $('#' + e.target.id).parent().addClass('active');
            this.$('#fc-app-title').html($('#' + e.target.id).text());
            this.renderSubView(e.target.id.split('-').pop());

        },
        render: function() {

            if (this.model.get('isVerified')) {
                $(document).attr('title', this.model.get('name') + "@" + this.model.get('server') + " | FelCraft");
            }
            this.$el.html(this.template(this.model.attributes));
            initFC();
            return this;
        },
        /**
         * Simple SPA Router function for rendering and managing subViews.
         * @param  {string} partial [Automatically fetched from event sender id]
         */
        renderSubView: function(partial) {

            if(this.activeSubView && this.activeSubView.type == partial+'View') { return; }
            if(this.activeSubView) { this.activeSubView.destroy(); } // clean up memory

            var subView;

            switch (partial) {
                /* Talents SubView */
                case "talents":
                    subView = new FC.TalentsView(this.model.talents, this.model.glyphs);
                break;
                /* Equipment SubView */
                case "equipment":
                    subView = new FC.EquipmentView(this.model.equipment);
                break;

                default:
                    // ignore
                break;
            }

            this.activeSubView = subView.render();
        }
    });
}(window, jQuery, _));
