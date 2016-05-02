(function (window, $) {
    window.FC.prototype.router = Backbone.Router.extend({
        routes: {
            "new": "render_new"
        },
        render_new: function () {
            var newChar = {
                server: '',
                region: '',
                name: '',
                isFound: false
            }

            new FC.NewCharSplashView(newChar);
        }
    });
}(window,jQuery));