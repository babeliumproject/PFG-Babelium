var TodoRouter = Backbone.Router.extend({
    // Defino las rutas y las funciones de cada ruta
    routes:
            {
                "Home": "goHome",
                "Practice/page_:p": "goPractice",
                "Practice/exercise/:name/:id": "goPrExercise",
                "Evaluate/page_:p": "goEvaluate",
                "Evaluate/response/:name/:id" : "goEvExercise",
                "Subtitle": "goSubtitle",
                "Config": "goConfig",
                "About": "goAbout",
                "User_info": "goUserInfo",
                "Help/page_:p": "goHelp",
                "Upload": "goUpload",
                "Search/:terms/page_:p": "goSearch"
            },
    goHome: function () {
        $('#bodyTitle').html("Home");
        $('#mainBody').html("Home entered");

        // Comprobacion de si en esta pantalla es necesaria la barra de busquedas
        var searchNavView = new SearchNavView({search: false});
    },
    goPractice: function (p) {
        $('#bodyTitle').html("Practice");
        // Cargo los videos desde el fichero JSON con fetch en la coleccion de videos                
        var videos = new VideoList();
        videos.fetch().done(function ()
        {
            // Saco el JSON de la respuesta del servidor
            var response = videos.models[0].attributes.response;
            // Convierto en array el JSON obtenido
            response = $.map(response, function(el) { return el; });

            // Genero una coleccion de videos auxiliar en la que guardar los 10 videos de 
            // la pagina en la que se encuentre el usuario e imprimirlos por pantalla.
            var selected = new VideoList();
            var i, l;
            i = ((p * 10) - 10);
            l = p * 10;
            while (i < l && i < response.length)
            {
                selected.add(response[i]);
                i++;
            }

            var pages;
            if (response.length % 10 === 0)
            {
                pages = Math.floor(response.length / 10);
            }
            else
            {
                pages = Math.floor(response.length / 10) + 1;
            }
            var videosView = new VideoListView({collection: selected, pages: pages, page: p, numVid: response.length});
            $('#mainBody').append(videosView.render());

            var searchNavView = new SearchNavView({search: true});
        });
    },

    goPrExercise: function (name,id) {
    	$('#bodyTitle').html("Practice");
    	var prEx = new PrExercise({name:name, id:id.toString()});
        var searchNavView = new SearchNavView({search: true});
    },

    goEvExercise: function (name,id) {
        $('#bodyTitle').html("Evaluate");
        var evEx = new EvExercise({name:name, id:id.toString()});
        var searchNavView = new SearchNavView({search: true});
    },

    goEvaluate: function (p) {
        $('#bodyTitle').html("Evaluate");
        // Cargo los videos desde el fichero JSON con fetch en la coleccion de videos                
        var videos = new ResponseList();
        videos.fetch().done(function ()
        {
            // Saco el JSON de la respuesta del servidor
            var response = videos.models[0].attributes.response;
            // Convierto en array el JSON obtenido
            response = $.map(response, function(el) { return el; });
            // Genero una coleccion de videos auxiliar en la que guardar los 10 videos de 
            // la pagina en la que se encuentre el usuario e imprimirlos por pantalla.
            var selected = new ResponseList();
            var i, l;
            i = ((p * 10) - 10);
            l = p * 10;
            while (i < l && i < response.length)
            {
                selected.add(response[i]);
                i++;
            }

            var pages;
            if (response.length % 10 === 0)
            {
                pages = Math.floor(response.length / 10);
            }
            else
            {
                pages = Math.floor(response.length / 10) + 1;
            }
            var videosView = new EvaluateView({collection: selected, pages: pages, page: p, numVid: response.length});
            $('#mainBody').append(videosView.render());

            var searchNavView = new SearchNavView({search: false});
        });
    },
    goSubtitle: function () {
        $('#bodyTitle').html("Subtitle");
        $('#mainBody').html("Subtitle entered");
        var searchNavView = new SearchNavView({search: true});
    },
    goConfig: function () {
        $('#bodyTitle').html("Configuration");
        var configView = new ConfigView();
        var searchNavView = new SearchNavView({search: false});
    },
    goAbout: function () {
        $('#bodyTitle').html("About");
        var aboutView = new AboutView();
        var searchNavView = new SearchNavView({search: false});
    },
    goUserInfo: function () {
        $('#bodyTitle').html("User Information");
        $.ajax({
            url: '/php/getSessionData.php',
            type: 'POST'
        }).done(function(data) {
            var d = JSON.parse(data);
            var currentUser = new User(d.response);console.log(currentUser);
            var userView = new UserView({model: currentUser});
            var searchNavView = new SearchNavView({search: false});
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });
    },
    goHelp: function (p) {
        $('#bodyTitle').html("Help");
        var helpView = new HelpView({page: p});
        var searchNavView = new SearchNavView({search: false});
    },
    goUpload: function ()
    {
        $('#bodyTitle').html("Upload new exercise");
        var uploadView = new UploadView();
        var searchNavView = new SearchNavView({search: false});
    },
    goSearch: function (terms, p)
    {
        $('#bodyTitle').html("Search exercise");
        var search = terms.split('&');
        var tags;
        var videos = new VideoList();
        videos.fetch().done(function ()
        {
            // Saco el JSON de la respuesta del servidor
            var response = videos.models[0].attributes.response;
            // Convierto en array el JSON obtenido
            response = $.map(response, function(el) { return el; });

            function checkTags(search, tags)
            {
                var found = false,
                        i = search.length,
                        cont = 0;
                while (found === false && cont < i)
                {
                    if ($.inArray(search[cont], tags) !== -1)
                    {
                        found = true;
                    }
                    else
                    {
                        cont++;
                    }
                }
                return found;
            };

            // Genero una coleccion de videos auxiliar en la que guardar los videos que
            // contengan en los tags las palabras escritas en la barra de busqueda 
            //y otra para los 10 correspondientes a cada pagina.
            var videos2 = new VideoList();
            var selected = new VideoList();

            // Primero cargo la lista de videos con los que cumplen con el tag
            for (var x = 0; x < response.length; x++)
            {
                tags = response[x].tags.split(',');
                if (checkTags(search, tags))
                {
                    videos2.add(response[x]);
                }
            }
            
            var i, i_aux, l;
            i = (p * 10) - 10;
            l = p * 10;
            while (i < l && i < videos2.length)
            {
                selected.add(videos2.models[i]);
                i++;
            }

            var pages;
            if (videos2.length % 10 === 0)
            {
                pages = Math.floor(videos2.length / 10);
            }
            else
            {
                pages = Math.floor(videos2.length / 10) + 1;
            }
            var videosView = new VideoListView({collection: selected, pages: pages, page: p, terms: terms, numVid: videos2.length});
            $('#mainBody').append(videosView.render());
            var searchNavView = new SearchNavView({search: true});
        });
    }
});

// Instancio el router que he configurado
var myTodoRouter = new TodoRouter();

// Permito que el historial tome nota de los routers visitados
Backbone.history.start();


/* Cosas que me gustaria hacer con router:
 - Comprobar si ha pasado cierto tiempo desde el login hasta el siguiente cambio de página para determinar si se necesita autentificacion otra vez o no.
 */