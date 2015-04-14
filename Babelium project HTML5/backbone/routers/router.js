var TodoRouter = Backbone.Router.extend({
    // Defino las rutas y las funciones de cada ruta
    routes: 
    {
        "Home" : "goHome",
        "Practice/page_:p" : "goPractice",
        "Evaluate" : "goEvaluate",
        "Subtitle" : "goSubtitle",
        "Config" : "goConfig",
        "About": "goAbout",
        "User_info": "goUserInfo",
        "Help/page_:p" : "goHelp"
    },

    goHome: function(){
        $('#bodyTitle').html("Home");
        $('#mainBody').html("Home entered");
    },

    goPractice: function(p){
        $('#bodyTitle').html("Practice");
        // Cargo los videos desde el fichero JSON con fetch en la coleccion de videos
        var videos = new VideoList();
        videos.fetch().done(function()
        {
            // Genero una coleccion de videos auxiliar en la que guardar los 10 videos de 
            // la pagina en la que se encuentre el usuario e imprimirlos por pantalla.
            var selected = new VideoList();
            var i,l;
            i = ((p*10) - 10);
            l = p*10;
            while (i < l && i < videos.length)
            {
                selected.add(videos.models[i]);
                i++;
            }
            var videosView = new VideoListView({collection:selected,pages:(videos.length%10)+1,page:p});
            $('#mainBody').append(videosView.render().el);
        });
    },

    goEvaluate: function(){
        $('#bodyTitle').html("Evaluate");
        $('#mainBody').html("Evaluate entered");
    },

    goSubtitle: function(){
        $('#bodyTitle').html("Subtitle");
        $('#mainBody').html("Subtitle entered");
    },

    goConfig: function(){
        $('#bodyTitle').html("Configuration");
        $('#mainBody').html("Config entered");
    },

    goAbout: function(){
        $('#bodyTitle').html("About");
        $('#mainBody').html("About entered");
    },

    goUserInfo: function(){
        $('#bodyTitle').html("User Information");
        var user = JSON.parse(sessionStorage.getItem('current_user'));
        var currentUser = new User(user);
        console.log(currentUser);
        var userView = new UserView({model:currentUser});
    },

    goHelp: function(p){
        $('#bodyTitle').html("Help");
        var helpView = new HelpView({page:p});
    },

});

// Instancio el router que he configurado
var myTodoRouter = new TodoRouter();

// Permito que el historial tome nota de los routers visitados
Backbone.history.start();