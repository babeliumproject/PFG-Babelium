var Video = Backbone.Model.extend({
	initialize: function() {
		console.log("Video created");
	},
	defaults:{
		id:"",
		title:"",
		description:"",
		language:"",
		tags:"",
		source:"",
		name:"",
		thumbnailUri:"",
		addingDate:"",
		duration:"",
		userName:"",
		avgDifficulty:"",
		status:"",
		license:"",
		reference:""
	}
});