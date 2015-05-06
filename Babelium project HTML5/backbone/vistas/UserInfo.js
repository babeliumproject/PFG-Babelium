var UserView = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<br>"
            + "<p>User name: <%= userName %></p><br>"
            + "<p>Email: <%= email %></p><br>"
            + "<p>Real name: <%= realName %></p><br>"
            + "<p>Real last name: <%= realLastname %></p><br>"
            + "<p>Mother tongue: <%= motherLang %></p><br>"
            + "<p>Other tongue: <%= otherLang %></p>"
            + "<p>Level: <%= oLLevel %></p><br>"
            + "<p>Interested in: <%= interestedIn %></p>"
            + "<p>Level: <%= iILevel %></p>"),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.my_template(this.model.toJSON()));
    }
});