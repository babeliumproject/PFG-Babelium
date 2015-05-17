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
        credits: "",
        motherLang: "",
        otherLang: "",
        oLLevel: "",
        interestIn: "",
        iILevel: ""
    }
});