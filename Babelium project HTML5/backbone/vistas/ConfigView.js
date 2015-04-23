var ConfigView = Backbone.View.extend({
  el : $("#mainBody"),
  my_template: _.template("<div id='tabs'>"
    +"<ul>"
    +"<li><a href='#Microphone'>Microphone</a></li>"
    +"<li><a href='#Camera'>Camera</a></li>"
    +"</ul><br><br>"
    +"<div id='Microphone'>"
    +"<p>This is the Microphone tab</p>"
    +"</div>"
    +"<div id='Camera'>"
    +"<p>This is the Camera tab</p>"
    +"</div>"    
),

  initialize: function() 
  { 
    this.render();
    $("#tabs").tabs();
  },

  render: function() 
  {
    this.$el.html(this.my_template());
  }
});