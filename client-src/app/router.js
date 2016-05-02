(function(window, $) {
    window.FC.prototype.router = Backbone.Router.extend({
        routes: {
            "new": "render_new",
            "app/:region/:server/:charName": "render_char",
            "app/:region/:server/:charName/:page": "render_char_page"
        },
        render_new: function() {
            var newChar = {
                server: '',
                region: '',
                name: '',
                isFound: false
            }

            this.view = new FC.NewCharSplashView(newChar);
        },
        /*
         Renders the base application for the given character combination.
        */
        render_char: function(region, server, charName) {
            // @TODO query backend for data and verification (to verify that the char exists)
            /* DEBUG */
            console.log("Hit render_char route with: ", "region: ",region, "server: ", server, "char: ", charName);
            var newChar = new FC.Character();
            newChar.set({'region':region, 'server':server, 'name': charName});
            this.view = new FC.CharacterView(newChar);
        }
    });
}(window, jQuery));
