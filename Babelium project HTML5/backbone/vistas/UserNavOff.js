var UserNavOff = Backbone.View.extend({
	el: $("#userNav"),
	my_template: _.template(
		"<li><a href='#Help/page_1' class='img'><img src='themes/babelium/images/help_icon.png' alt='Help' width='17' height='17'/></a></li>"
		+"<li><a href='#Help/page_1' class='blue'>Help</a></li>"
		+"<li><a href='http://blog.babeliumproject.com/' class='blue'>Blog</a></li>"
		+"<li><a href='#modalLogin' class='yellow'>Login</a></li>"
		+"<li><a href='#modalRegister' class='yellow'>Register</a></li>"),

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.my_template());
	}
})