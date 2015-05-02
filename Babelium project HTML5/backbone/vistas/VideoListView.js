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
  { this.$el.html("");
  	//Por cada video genera un view de video individual
  	this.collection.each(function(video){
    	var vidView = new VideoView({model:video});
    	//Une el view a donde se pone la coleccion
    	this.$el.append(vidView.render().el);
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



/* function paginationLimits(pages,page)
    {
      var i = 1,
      found = false;
      while(!found && pages+10 > i)
      {
        if(page < i+10 && page > i)
        {
          found = true;
        }
        else
        {
          i = i + 10;
        }
      }
      return i;
    }

    var limits = paginationLimits(this.options.pages,this.options.page);

    if(this.options.page > 10 && this.options.pages > 10)
    {
      if(this.options.terms)
      {
        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(limits-10)+"'><</a>    ");
      }
      else
      {
        $('#vidNavB').append("<a href='#Practice/page_"+(limits-10)+"'><</a>    ");
      }
    }
    var i = limits;console.log(i+" "+this.options.pages);
    while(i < limits + 10 && i <= this.options.pages)
    {
      if(this.options.terms)
      {
        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+i+"'>"+i+"</a>    ");
      }
      else
      {
        $('#vidNavB').append("<a href='#Practice/page_"+i+"'>"+i+"</a>    ");
      }
      i++
    }

    if(this.options.page+9 > this.options.pages)
    {
      if(this.options.terms)
      {
        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(limits+10)+"'>></a>    ");
      }
      else
      {
        $('#vidNavB').append("<a href='#Practice/page_"+(limits+10)+"'>></a>    ");
      }
    }
    return this;*/