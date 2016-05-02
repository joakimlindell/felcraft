(function (window, $, _) {

FC.Character =  Backbone.Model.extend({
    defaults: {
        region: 'eu',
        server: 'frostwhisper',
        name: 'coryn',
        isFound: false,
        items: [],
        talents: [],
        glyphs: [],
        last_optimised: null
    }
});

}(window, jQuery, _));