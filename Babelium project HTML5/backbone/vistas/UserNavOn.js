var UserNavOn = Backbone.View.extend({
	el: $("#userNav"),
	my_template: _.template(
		"<li><a href='#' class='img'><img src='themes/babelium/images/help_icon.png' alt='Help' width='17' height='17'/></a></li>"
		+"<li><a href='#' class='blue'>Help</a></li>"
		+"<li><a href='http://blog.babeliumproject.com/' style='color:blue'>Blog</a></li>"
		+"<li><a href='#' class='yellow'>Credit: 0</a></li>"
		+"<li><a href='javascript:showUserInfo();' style='color:orange'><%= userName %></a></li>"),

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.my_template(this.model.toJSON()));
	}
})


