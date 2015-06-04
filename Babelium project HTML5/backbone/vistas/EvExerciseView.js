var EvExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<section class='exerciseInfo'>"
        +"<p><h2 id='babelium-exercise-title'></h2></p>"
        +"<article>"
        +"<div class='no-overflow'>"
        +"<object type='application/x-shockwave-flash' id='babeliumPlayer' name='babeliumPlayer' align='middle' data='http://babeliumproject.com/babeliumPlayer.swf' width='640' height='380' style='height: 332px; width: 500px;'>"
        +"<param name='quality' value='high'>"
        +"<param name='bgcolor' value='#000000'>"
        +"<param name='allowscriptaccess' value='always'>"
        +"<param name='allowfullscreen' value='true'>"
        +"<param name='wmode' value='window'>"
        +"<param name='flashvars' value='locale=es&amp;forcertmpt=1&amp;jsCallbackObj='>"
        +"</object>"
        +"</div>"
        +"</article>"
        +"<article id='exerciseInfo' class='exerciseInfo aligned'>"
        +"</section>"
    ),
    events:
            {

            },
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');

        var exData, exRoles, exSubs, respData;
        $.ajax({
            url: '/php/response.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
            respData = data;
            console.log(data);
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });

        var ctx = this;
        // Hay que hacer esperar un poco para obtener las respuestas a todas las llamadas necesarias
        var varCheck = setInterval(function()
        {  
            if(respData && !exData)
            {
                $.ajax({
                    url: '/php/video.php',
                    type: 'POST',
                    dataType: "json",
                    data: { id: respData.response.exerciseId }
                }).done(function(data) {
                    exData = data;
                    console.log(data);
                }).fail(function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                });
            }
            // Para evitar que se se repita el proceso innecesariamente
            if(exData && !exSubs)
            {
                $.ajax({
                    url: '/php/subtitles.php',
                    type: 'POST',
                    dataType: "json",
                    data: { id: exData.response.id, lang: exData.response.language}
                }).done(function(data) {
                    exSubs = data;
                    console.log(data);
                }).fail(function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                });
            }

            // Seguimos cuando están todos los datos guardados
            if(exData && respData && exSubs)
            {
                window.clearInterval(varCheck);
                ctx.render(exData,respData,exSubs);
            }
        },500);
        //¿Y que hago yo con esto? 
        //bpPlayer.exerciseSource(this.options.exid:String):Void
    },
    render: function (exData,respData,exSubs)
    {
        init("babeliumproject.com", "en", "1", respData, exSubs, "", "");
        this.$el.html(this.my_template());
        
        var i = 0;

        $("#babelium-exercise-title").append(exData.response.title);
    },
    
    record: function ()
    {
        // En la documentacion no viene nada de lo de grabar...
        $('#exerciseInfo').css('display','none');
        $('#recordingEndOptions').css('display','inline-block');
    },

    discard: function ()
    {
        $('#recordingEndOptions').css('display','none');
        $('#exerciseInfo').css('display','inline-block');
    }
});