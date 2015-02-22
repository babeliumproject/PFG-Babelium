var UserView = Backbone.View.extend({
	tagname:'li',

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.model.get('userName'));
	}
})