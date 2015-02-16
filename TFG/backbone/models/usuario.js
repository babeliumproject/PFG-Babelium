var Usuario = Backbone.Model.extend({
	initialize: function(){
		console.log("Se ha creado un usuario");
	},
	defaults: {
		user:''
		password:''
	}
});

