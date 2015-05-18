var User = Backbone.Model.extend({
    initialize: function () {
        console.log("User created");
    },
    defaults: {
        userName: "",
        email: "",
        realName: "",
        realLastName: "",
        credits: "",
        languages: []
    }
});