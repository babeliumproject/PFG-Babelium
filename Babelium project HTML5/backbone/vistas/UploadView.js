var UploadView = Backbone.View.extend({
  el : $("#mainBody"),
  my_template: _.template("<form class='upForm' action='action_page.php'>"
    +"<label for='upTitle'>Title: *</label><br>"
    +"<input type='text' name='upTitle' id='upTitle' required><br>"
    +"<label for='upDescrip'>Description: *</label><br>"
    +"<input type='text' name='upDescrip' id='upDescrip' required><br>"
    +"<label for='upTags'>Tags: *</label><br>"
    +"<input type='text' name='upTags' id='upTags' required><br>"
    +"<label for='upDifLvl'>Difficulty level: *</label><br>"
    +"<select name='upDifLvl' id='upDifLvl' required>"
    +"<option value='A1 Begginer'>A1 Begginer</option>"
    +"<option value='A2 Elementary'>A2 Elementary</option>"
    +"<option value='B1 Pre-Intermediate'>B1 Pre-Intermediate Begginer</option>"
    +"<option value='B2 Intermediate'>B2 Intermediater</option>"
    +"<option value='C1 Upper intermediate'>C1 Upper intermediate</option>"
    +"</select><br>"
    +"<label for='upLang'>Language: *</label><br>"
    +"<select name='upLang' id='upLang' required>"
    +"<option value='Spanish'><img src='themes/babelium/images/flags/flag_spain' width='16' height='16' alt='flag'/>Spanish</option>"
    +"<option value='English'><img src='themes/babelium/images/flags/flag_united_states' width='16' height='16' alt='flag'/>English</option>"
    +"<option value='Basque'><img src='themes/babelium/images/flags/flag_basque_country' width='16' height='16' alt='flag'/>Basque</option>"
    +"</select><br>"
    +"<label for='upLic'>Video license: *</label><br>"
    +"<select name='upLic' id='upLic' required>"
    +"<option value='Attribution No Derivative'>Attribution No Derivative</option>"
    +"<option value='Attribution Share Alike'>Attribution Share Alike</option>"
    +"<option value='Attribution'>Attribution</option>"
    +"<option value='Attribution Non-Commercial'>Attribution Non-Commercial</option>"
    +"<option value='Attribution Non-Commercial Share Alike'>Attribution Non-Commercial Share Alike</option>"
    +"<option value='Attribution Non-Commercial No Derivative'>Attribution Non-Commercial No Derivative</option>"
    +"<option value='Other (Copyrighted)'>Other (Copyrighted)</option>"
    +"</select><br>"
    +"<label for='upAuthor'>Language: </label><br>"
    +"<input type='text' name='upAuthor' id='upAuthor'><br>"
    +"<label for='upCheck'>Choose an uploading method: </label><br><br>"
    +"<input type='radio' name='upCheck' value='fromPc'>Upload a video file from your computer<br>"
    +"<input type='radio' name='upCheck' value='fromCam'>Record an exercise with the webcam and save it"
    +"<div id='divFile' style='display:none'><input type='file' name='upFile' accept='video/*'></div>"
    +"<div id='divRecord' style='display:none'></div>"
    +"</form><br><br>"
    +"<p>NOTE: The maximum allowed video size is 2000MB. In addition, the videos shouldn't be shorter than 15 seconds or longer than 360 seconds, otherwise they will be rejected.</p><br>"
    +"<p style='padding-bottom:30px'>In our research we've found that the user's concentration level drops significantly when dubbing videos longer than 360 seconds."
    +"Also, since live dubbing is a stressful task, we limit the duration in hopes to keep a balance between the amount of speaking practice the user achieves and the frustration he/she gets along the process.</p>"
),

  events:
  { 
    'change upCheck': 'goFromCam'
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