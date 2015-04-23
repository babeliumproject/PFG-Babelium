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
        "Help/page_:p" : "goHelp",
        "Upload" : "goUpload"
    },

    goHome: function(){
        $('#bodyTitle').html("Home");
        $('#mainBody').html("Home entered");

        // Comprobacion de si en esta pantalla es necesaria la barra de busquedas
        var searchNavView = new SearchNavView({search:false});
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

            var searchNavView = new SearchNavView({search:true,page:p});
        });
    },

    goEvaluate: function(){
        $('#bodyTitle').html("Evaluate");
        $('#mainBody').html("Evaluate entered");
        var searchNavView = new SearchNavView({search:true});
    },

    goSubtitle: function(){
        $('#bodyTitle').html("Subtitle");
        $('#mainBody').html("Subtitle entered");
        var searchNavView = new SearchNavView({search:true});
    },

    goConfig: function(){
        $('#bodyTitle').html("Configuration");
        var configView = new ConfigView();
        var searchNavView = new SearchNavView({search:false});
    },

    goAbout: function(){
        $('#bodyTitle').html("About");
        var aboutView = new AboutView();
        var searchNavView = new SearchNavView({search:false});
    },

    goUserInfo: function(){
        $('#bodyTitle').html("User Information");
        var user = JSON.parse(sessionStorage.getItem('current_user'));
        var currentUser = new User(user);
        console.log(currentUser);
        var userView = new UserView({model:currentUser});
        var searchNavView = new SearchNavView({search:false});
    },

    goHelp: function(p){
        $('#bodyTitle').html("Help");
        var helpView = new HelpView({page:p});
        var searchNavView = new SearchNavView({search:false});
    },

    goUpload: function()
    {
        $('#bodyTitle').html("Upload new exercise");
        var uploadView = new UploadView();
        var searchNavView = new SearchNavView({search:false});
    }
});

// Instancio el router que he configurado
var myTodoRouter = new TodoRouter();

// Permito que el historial tome nota de los routers visitados
Backbone.history.start();


/* Cosas que me gustaria hacer con router:
        - Comprobar si ha pasado cierto tiempo desde el login hasta el siguiente cambio de página para determinar si se necesita autentificacion otra vez o no.
*/