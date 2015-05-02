var VideoListView = Backbone.View.extend({
  el : $("#mainBody"),
  
  my_template: _.template("<div id='vidNavB' class='vidNavB'>"
    /*+"<% if (this.options.pages == 1) { %>"
    +"<button id='previous' disabled>Previous</button><button id='next' disabled>Next</button>"
    +"<% } else { if(this.options.page == 1){ %>"
    +"<button id='previous' disabled>Previous</button><button id='next'>Next</button>"
    +"<% } else { if(this.options.page == this.options.pages){ %>"
    +"<button id='previous'>Previous</button><button id='next' disabled>Next</button>"
    +"<% } else { %>"
    +"<button id='previous'>Previous</button><button id='next'>Next</button>"
    +"<% }}} %>"*/
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
    console.log(this.options.pages + " " + this.options.page);
  },

  render: function() 
  {
    this.$el.html("<div id='videosDiv' class='videosDiv'></div>");
  	//Por cada video genera un view de video individual
  	this.collection.each(function(video){
    	var vidView = new VideoView({model:video});
    	//Une el view a donde se pone la coleccion
    	this.$('#videosDiv').append(vidView.render().el);
  	},this);
    //Añado los botones para navegar entre las paginas
    this.$el.append(this.my_template());

    for(var i = 1;i<=this.options.pages;i++)
    {
      if(this.options.terms)
      {
        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+i+"'>"+i+"</a>    ");
      }
      else
      {
        $('#vidNavB').append("<a href='#Practice/page_"+i+"'>"+i+"</a>    ");
      }
    }
  	return this;
  },

  goPrevious: function()
  {
    var n = this.options.page--;
    
    if(this.options.terms)
    {
      window.location.href='#Search/'+this.options.terms+'/page_'+n;
    }
    else
    {
      window.location.href='#Practice/page_'+n;
    }
  },

  goNext: function()
  {
    var n = this.options.page++;
   
    if(this.options.terms)
    {
      window.location.href='#Search/'+this.options.terms+'/page_'+n;
    }
    else
    {
      window.location.href='#Practice/page_'+n;
    }
  }
});