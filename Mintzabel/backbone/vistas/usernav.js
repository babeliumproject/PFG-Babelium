var UserNav = Backbone.View.extend({
	template: _.template( $('#userNavTpl').html()),

	initialize: function(){
		this.render();
		console.log("usernav created");
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
	}
})