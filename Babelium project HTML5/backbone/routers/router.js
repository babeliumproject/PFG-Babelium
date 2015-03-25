var TodoRouter = Backbone.Router.extend({
    /* define the route and function maps for this router */
    routes: {
        "Home" : "goHome",
        "Practice" : "goPractice",
        "Evaluate" : "goEvaluate",
        "Subtitle" : "goSubtitle",
        "Config" : "goConfig",
        "About": "goAbout"
    },

    goHome: function(){
        console.log(":D");
    },

    goPractice: function(){
console.log(":D");
    },

    goEvaluate: function(){
console.log(":D");
    },

    goSubtitle: function(){
console.log(":D");
    },

    goConfig: function(){
console.log(":D");
    },

    goAbout: function(){
console.log(":D");
    }
});

/* Now that we have a router setup, we need to instantiate it */

var myTodoRouter = new TodoRouter();

Backbone.history.start();