var ConfigView = Backbone.View.extend({
  el : $("#mainBody"),
  my_template: _.template("<ul class='tabs'>"
    +"<li id='Microphone'><a href='#Config/Microphone'>Microphone</a></li>"
    +"<li id='Camera'><a href='#Config/Camera'>Camera</a></li>"
    +"</ul><br><br>"
    +"<% if (this.options.tab == 'Microphone') { %>"
    +"<p>This is the Microphone tab</p>"
    +"<% } else { %>"
    +"<p>This is the Camera tab</p>"
    +"<% } %>"
),

  initialize: function(options) 
  { 
    this.options = options;
    _.bindAll(this, 'render');
    this.render();
    $('#'+this.options.tab).addClass('active');
  },

  render: function() 
  {
    this.$el.html(this.my_template());
  }
});