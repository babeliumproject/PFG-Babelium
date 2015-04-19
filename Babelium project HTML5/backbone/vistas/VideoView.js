var VideoView = Backbone.View.extend({
	tagName: 'li',
	my_template: _.template("<article class='exercise'>"
	  				+"<figure class='thumbnail'>"
					+"<img src='http://cdn.visualnews.com/wp-content/uploads/2013/03/Thumbs-and-Ammo-15.jpg' alt='<%= title %>' width='120' height='90' align='left'/>"
					+"<figcaption><%= duration %></figcaption>"
					+"</figure>"
					+"<div>"
					+"<h1 class='exerciseTitle'>"
					+"<%= title %>"
					+"</h1>"
					+"<div class='separator'></div>"
					+"<div class='HBox dtop'>"
					//+"<div><img src='' width='16' height='16' alt='flag'/></div>"
					+"<div><%= language %></div>"
					+"<div><%= avgDifficulty %></div>"
					+"<div><%= addingDate %></div>"
					+"</div>"
					+"<p class='exerciseDescription'><%= description %></p>"
					+"<p class='username'>User: <font color='#666'><%= userName %></font></p>"
					+"<p>Tags:<%= tags %></p>"
					+"<p><a href='http://creativecommons.org/licenses/<%= license %>/3.0/'>"
					+"<img src='http://www.mintzabel.com/themes/babelium/images/licenses/<%= license %>.png' width='80' height='15' alt='<%= license %>' border='0'></a>"
					+"</p></div></article>"
),

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.my_template(this.model.toJSON()));
		return this;
	}
})