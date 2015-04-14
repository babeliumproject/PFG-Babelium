var UserNavOn = Backbone.View.extend({
	el: $("#userNav"),
	my_template: _.template(
		"<li><a href='#Help/page_1' class='img'><img src='themes/babelium/images/help_icon.png' alt='Help' width='17' height='17'/></a></li>"
		+"<li><a href='#Help/page_1' class='blue'>Help</a></li>"
		+"<li><a href='http://blog.babeliumproject.com/' style='color:blue'>Blog</a></li>"
		+"<li><a href='#Credit' class='yellow'>Credit: 0</a></li>"
		+"<li><a href='#User_info' style='color:orange'><%= userName %></a></li>"
		+"<li><a href='/' id='logoff' style='color:orange'>Log off</a></li>"),
	events: 
    {
        "click #logoff" : "emptyLocalS",
    },

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.my_template(this.model.toJSON()));
	},

	emptyLocalS: function(){
		sessionStorage.clear();
	}
})


