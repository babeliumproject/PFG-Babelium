var VideoListView = Backbone.View.extend({
  el : $("#mainBody"),
  tagName: 'ul',

  render: function() {
  		//Por cada video genera un view de video individual
  		this.collection.each(function(video){
  		var vidView = new VideoView({model:video});
  		//Une el view a donde se pone la coleccion
  		this.$el.append(vidView.render().el);
  	},this);

  		return this;
  }
} );