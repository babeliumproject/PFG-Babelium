var AboutView = Backbone.View.extend({
  el : $("#mainBody"),
  my_template: _.template("<p class='abTitle'>Who are we?</p><br>"
  +"<p>We are a group of researchers and students from the Basque Country's Public University (UPV/EHU) hypermedia and multimedia research group (GHyM).<br>"
  +"This group is primarily focused on developing innovative web-based educational applications and services. You can follow us on Twitter @babelium :-)</p><br><br>"
  +"<p>We also work closely with Elurnet, a company that focuses on open source training and development. Elurnet is the<br>"
  +"only authorized Babelium official support and services provider.<p><br><br>"
  +"<p class ='abTitle'>Contact Info</p><br>"
  +"<p>Feel free to send us your comments, questions or suggestions to:<br>"
  +"<a href='mailto:babeliumproject@gmail.com'>babeliumproject@gmail.com</a><br><br>"
  +"<p class='abTitle'>Application Info</p><br>"
  +"<p>Application Version: 1.0</p><br><br>"//TODO ¿es dinamico o no?
  +"<p class='abTitle'>Third-party resources</p><br>"
  +"<p> Aqui lo que diga Juanan </p>"

),

  initialize: function() 
  {
    this.render();
  },

  render: function() 
  {
    this.$el.html(this.my_template());
  }
});