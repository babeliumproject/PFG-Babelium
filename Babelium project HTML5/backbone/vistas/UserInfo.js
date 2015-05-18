var UserView = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<div class='profile'><h2>My Profile</h2><hr>"
            + "<p>In this section you can modify all the data and customize your experience in the application.</p>"
            + "<div class='userInfo'>"
            + "<p>Personal Information</p><a href='#User_info/Personal_info'>edit personal information</a><hr>"
            + "<label>Real name:</label> <%= realName %><br>"
            + "<label>Real surname:</label> <%= realLastname %><br>"
            + "<label>eMail:</label> <%= email %><br>"
            + "<p>Security</p><a href='#User_info/Security'>modify password</a><hr>"
            + "<p>Languages</p><a href='#User_info/edit_languages'>edit languages</a><hr>"
            + "<label>Mother tongue:</label> <%= languages[0] %><br><br>"
            + "<% _.each(languages, function(languages){ %>"
            + "<label>Other tongue:</label> <%= languages[i] %><br>"
            + "<label>Level:</label> <%= oLLevel %><br><br>"
            + "<label>Interested in:</label> <%= interestIn %><br>"
            + "<label>Level:</label> <%= iILevel %></div></div>"
            + "<% }); %>"),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.my_template(this.model.toJSON()));
    }
});