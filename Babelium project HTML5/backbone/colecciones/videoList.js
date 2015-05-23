var VideoList = Backbone.Collection.extend({
    model: Video,
    url: 'php/videoList.php',

    initialize: function()
    {
    	//var response = [];
    	//response = this.models.attributes.response;
    	//console.log(response)
    }
});
