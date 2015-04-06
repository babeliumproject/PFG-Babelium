var VideoListView = Backbone.View.extend({
  el : $("#mainBody"),
  tagName: 'ul',
  my_template: _.template("<div>"
    +" <% if (this.options.page == 1) { %>"
    +"<button id='previous' disabled>Previous</button><button id='next'>Next</button>"
    +"<% } else { if(this.options.pages == this.options.page){ %>"
    +"<button id='previous'>Previous</button><button id='next' disabled>Next</button>"
    +"<% } else { %>"
    +"<button id='previous'>Previous</button><button id='next>Next</button>"
    +"<% }} %>"
    +"</div>"
),
  events:
  { 
    'click #previous': 'goPrevious',
    'click #next': 'goNext'
  },

  initialize: function(options) 
  {
    this.options = options;
    _.bindAll(this, 'render');
  },

  render: function() 
  {
    this.$el.html("");
  	//Por cada video genera un view de video individual
  	this.collection.each(function(video){
    	var vidView = new VideoView({model:video});
    	//Une el view a donde se pone la coleccion
    	this.$el.append(vidView.render().el);
  	},this);
    //Añado los botones para navegar entre las paginas
    this.$el.append(this.my_template());
  	return this;
  },

  goPrevious: function()
  {
    var n = this.options.page--;
    window.location.href='#Practice/page_'+n;
  },

  goNext: function()
  {
    var n = this.options.page++;
    window.location.href='#Practice/page_'+n;
  }
});