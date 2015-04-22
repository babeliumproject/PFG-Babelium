var UploadView = Backbone.View.extend({
  el : $("#mainBody"),
  my_template: _.template("<form action='action_page.php'>"
    +"<fieldset>"
    +"<legend>Upload information:</legend>"
    +"<label for='upTitle'>Title: *</label>"
    +"<input type='text' name='upTitle' id='upTitle' required><br>"
    +"<label for='upDescrip'>Description: *</label>"
    +"<input type='text' name='upDescrip' id='upDescrip' required><br>"
    +"<label for='upTags'>Tags: *</label>"
    +"<input type='text' name='upTags' id='upTags' required><br>"
    +"<label for='upDifLvl'>Difficulty level: *</label>"
    +"<select name='upDifLvl' id='upDifLvl' required>"
    +"<option value='A1 Begginer'>A1 Begginer</option>"
    +"<option value='A2 Elementary'>A2 Elementary</option>"
    +"<option value='B1 Pre-Intermediate'>B1 Pre-Intermediate Begginer</option>"
    +"<option value='B2 Intermediate'>B2 Intermediater</option>"
    +"<option value='C1 Upper intermediate'>C1 Upper intermediate</option>"
    +"</select><br>"
    +"<label for='upLang'>Language: *</label>"
    +"<select name='upLang' id='upLang' required>"
    +"<option value='Spanish'><img src='themes/babelium/images/flags/flag_spain' width='16' height='16' alt='flag'/>Spanish</option>"
    +"<option value='English'><img src='themes/babelium/images/flags/flag_united_states' width='16' height='16' alt='flag'/>English</option>"
    +"<option value='Basque'><img src='themes/babelium/images/flags/flag_basque_country' width='16' height='16' alt='flag'/>Basque</option>"
    +"</select><br>"
    +"<label for='upLic'>Video license: *</label>"
    +"<select name='upLic' id='upLic' required>"
    +"<option value='Attribution No Derivative'>Attribution No Derivative</option>"
    +"<option value='Attribution Share Alike'>Attribution Share Alike</option>"
    +"<option value='Attribution'>Attribution</option>"
    +"<option value='Attribution Non-Commercial'>Attribution Non-Commercial</option>"
    +"<option value='Attribution Non-Commercial Share Alike'>Attribution Non-Commercial Share Alike</option>"
    +"<option value='Attribution Non-Commercial No Derivative'>Attribution Non-Commercial No Derivative</option>"
    +"<option value='Other (Copyrighted)'>Other (Copyrighted)</option>"
    +"</select><br>"
    +"</fieldset>"
    +"</form>"
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
  }

});