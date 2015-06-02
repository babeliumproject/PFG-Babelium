var ResponseList = Backbone.Collection.extend({
    model: Response,
    url: 'php/responseVideoList.php',

    initialize: function()
    {
    	//var response = [];
    	//response = this.models.attributes.response;
    	//console.log(this)
    }
});
