var TodoRouter = Backbone.Router.extend({
    // Defino las rutas y las funciones de cada ruta
    routes: 
    {
        "Home" : "goHome",
        "Practice/page_:p" : "goPractice",
        "Evaluate" : "goEvaluate",
        "Subtitle" : "goSubtitle",
        "Config" : "goConfig",
        "About": "goAbout"
    },

    goHome: function(){
        console.log("Home entered");
    },

    goPractice: function(p){
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
        console.log("Evaluate entered");
    },

    goSubtitle: function(){
        console.log("Subtitle entered");
    },

    goConfig: function(){
        console.log("Config entered");
    },

    goAbout: function(){
        console.log("About entered");
    }
});

// Instancio el router que he configurado
var myTodoRouter = new TodoRouter();

// Permito que el historial tome nota de los routers visitados
Backbone.history.start();