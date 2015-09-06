var VideoList = Backbone.Collection.extend({
    model: Video,
    url: 'php/videoList.php',

    initialize: function()
    {
    	
    }
});
