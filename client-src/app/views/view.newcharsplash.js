(function(window, $, _) {

    /* NewCharSplashView - The entry point of the application allowing the
     * user to input their server, region and character name (class in the future).
     *
     * No associated model at this point.
     * */
    FC.NewCharSplashView = Backbone.View.extend({
        el: '#content',
        template: _.template($('#newCharSplash').html()),
        events: {
            'click #felcraft-start-btn': 'verifyChar'
        },

        initialize: function(initialChar) {
            this.model = new FC.Character(initialChar);
            this.model.on("change:isVerified", this.verifyChanged, this);
            this.render();
            $(document).attr('title', "New | FelCraft");
        },

        verifyChar: function(event) {
            var model = this.model;
            var view = this;
            console.log("Init char fired");
            var newCharName = this.$('#felcraft-charname-txt').val();
            var newCharServer = this.$('#felcraft-server-txt').val();
            var newCharRegion = this.$("input:radio[name ='radioInline']:checked").val();

            if (newCharName !== '' && newCharServer !== '') {
                // verify
                model.set({
                    'name': newCharName,
                    'server': newCharServer,
                    'region': newCharRegion
                });

                this.$('#felcraft-char-form').fadeOut('fast', function() {
                    view.$('#loading-spinner').fadeIn();
                });

                setTimeout(function() {
                    model.verify();
                }, 2750);
            }

        },

        verifyChanged: function() {
            var view = this;
            if (!this.model.get('isVerified')) {
                console.log("Error, character wasnt verified");

            } else {
                // Got it
                this.$('#loading-status-msg').html('Got it!<br />');
                setTimeout(function() {
                    this.$('#loading-status-msg').html('Grabbing metrics...');
                    setTimeout(function() {
                        this.$('#loading-status-msg').html('All done! Rendering application...');

                        setTimeout(function() {
                            // FC router navigate app
                            FCI.active_router.navigate('app/'
                                + view.model.get('region') + '/'
                                + view.model.get('server') + '/'
                                + view.model.get('name'),
                                { trigger: true });

                            view.close();

                        }, 1000);
                    }, 2000);
                }, 1500);
            }
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        close: function() {
            //this.remove();
            this.unbind();
        }
    });
}(window, jQuery, _));
