var UserView = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<div class='profile'><h2>My Profile</h2><hr>"
            + "<p>In this section you can modify all the data and customize your experience in the application.</p>"
            + "<div class='userInfo'>"
            + "<p>Personal Information</p><a href='#User_info/Personal_info'>edit personal information</a><hr>"
            + "<label>Real name:</label> <%= firstname %><br>"
            + "<label>Real surname:</label> <%= lastname %><br>"
            + "<label>eMail:</label> <%= email %><br>"
            + "<p>Security</p><a href='#User_info/Security'>modify password</a><hr>"
            + "<p>Languages</p><a href='#User_info/edit_languages'>edit languages</a><hr>"
            + "<label>Languages I know:</label><br><br>"
            + "<% _.each(userLanguages, function(language){ %>"
            + "<% if(language.purpose === 'evaluate') { %>"
            + "<img src='themes/babelium/images/flags/<%= language.language %>.png' width='16' height='16' alt='flag'/><label class='langLvl'> <%= language.level %></label><br>"
            + "<% }}); %>"
            + "<br><label>Languages I'm practicing:</label><br><br>"
            + "<% _.each(userLanguages, function(language){ %>"
            + "<% if(language.purpose === 'practice') { %>"
            + "<img src='themes/babelium/images/flags/<%= language.language %>.png' width='16' height='16' alt='flag'/><label class='langLvl'> <%= language.level %></label><br>"
            + "<% }}); %>"),
    initialize: function () {
        this.render();
    },
    render: function () {
        console.log(this.model);
        this.$el.html(this.my_template(this.model.toJSON()));
    }
});