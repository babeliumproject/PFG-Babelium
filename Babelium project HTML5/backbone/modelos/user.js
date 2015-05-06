var User = Backbone.Model.extend({
    initialize: function () {
        console.log("User created");
    },
    defaults: {
        userName: "",
        email: "",
        password: "",
        realName: "",
        realLastName: "",
        motherLang: "",
        otherLang: "",
        oLLevel: "",
        interestedIn: "",
        iILevel: ""
    }
});