var SearchNavView = Backbone.View.extend({
  el : $("#searchnav"),
  my_template: _.template("<button id='btnUpload' class='upload'>Upload</button>"
    +"<% if (this.options.search) { %>"
    +"<input id='txtSearch' type='text' placeholder='Enter your search terms...' class='search boxFlex' />"
    +"<button id='btnSearch'>Search</button>"
    +"<% } %>"
),

  events:
  { 
    'click #btnSearch': 'goSearch',
    'click #btnUpload': 'goUpload'
  },

  initialize: function(options) 
  { 
    this.options = options;
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() 
  {
    this.$el.html(this.my_template());
  },

  goSearch: function()
  {
    var search = $('#txtSearch').val().split(' ');
    var tags;
    var videos = new VideoList();
    var p = this.options.page;
    videos.fetch().done(function()
    {

      function checkTags(search, tags) 
      {
        var found = false,
        i = search.length,
        cont = 0;
        while(found == false && cont < i)
        {
          if($.inArray(search[cont], tags) != -1)
          {console.log(';D');
            found = true;
          }
          else
          {
            cont++;
          }
        }
        return found;          
      };
      // Genero una coleccion de videos auxiliar en la que guardar los videos que
      // contengan en los tags las palabras escritas en la barra de busqueda.
      var selected = new VideoList();
      var i,i_aux,l;
      i = (p*10) - 10;
      i_aux = (p*10) - 10;
      l = p*10;
      while (i_aux < l && i < videos.length)
      {
        tags = videos.models[i].attributes.tags.split(',');
        if(checkTags(search,tags))
        {
          selected.add(videos.models[i]);
          i_aux++;
        }
        // TODO No estoy yo muy seguro de esto... no tendria que haber otra variable controlando los aceptados ya que no se aceptan todos.
        i++;
      }
      var videosView = new VideoListView({collection:selected,pages:(videos.length%10)+1,page:p});
      $('#mainBody').append(videosView.render().el);
    });
  },

  goUpload: function()
  {

  }
});