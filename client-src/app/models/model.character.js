(function(window, $, _) {

    FC.Character = Backbone.Model.extend({
        defaults: {
            region: 'eu',
            server: 'frostwhisper',
            name: 'coryn',
            isVerified: false,
            items: [],
            talents: [],
            glyphs: [],
            last_optimised: null
        },
        verify: function() {
            var model = this;
            console.log("Verifying ", model.name, " character...");
            $.ajax({
                url: '/character/verify',
                success: function(data, status) {
                    console.log("Character confirmed. OK!");
                    model.set({ 'isVerified': true });
                },
                error: function(error) {
                    // Something went wrong
                    console.log("Failed to verify character: ", error);
                }
            });
        }
    });

}(window, jQuery, _));
