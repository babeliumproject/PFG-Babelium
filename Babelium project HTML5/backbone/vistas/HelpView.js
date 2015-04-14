var HelpView = Backbone.View.extend({
  el : $("#mainBody"),
  my_template: _.template("<div>"
    +"<button id='help1'>1</button><button id='help2'>2</button><button id='help3'>3</button><button id='help4'>4</button></div>"
    /*+"<% if (this.options.page == 1) { %>"
    +"<h3>How to configure your video/audio devices</h3>"
    +"<% } else { if(this.options.page == 2){ %>"
    +"<h3>How to practice a language</h3>"
    +"<% } else { if(this.options.page == 3){ %>"
    +"<h3>How to evaluate the work of other users</h3>"
    +"<% } else { if(this.options.page == 4){ %>"
    +"<h3>How to subtitle a video</h3>"
    +"<% }}}} %>"*/
),
  /*events:
  { 
    'click #help1': 'go1',
    'click #help2': 'go2',
    'click #help3' : 'go3',
    'click #help4' : 'go4'
  },*/

  initialize: function(options) 
  {
   /* this.options = options;
    _.bindAll(this, 'render');*/
  },

  render: function() 
  {
    this.$el.html(this.my_template());
  }//,
/*
  go1: function()
  {
    var n = 1;
    window.location.href='#Help/page_'+n;
  },

  go2: function()
  {
    var n = 2;
    window.location.href='#Help/page_'+n;
  },

  go3: function()
  {
    var n = 3;
    window.location.href='#Help/page_'+n;
  },

  go4: function()
  {
    var n = 4;
    window.location.href='#Help/page_'+n;
  }*/
});