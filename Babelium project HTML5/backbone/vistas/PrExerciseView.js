var exData, exRoles, exLoc, exSubs;
var PrExercise = Backbone.View.extend({
    el: $("#mainBody"),
    events:
            {
                'click #record': 'record',
                'click #discard': 'discard',
                'change #recordedRole': 'changeRole',
                'change #recLocale': 'changeLang',
                'change #checkM':'changeMC',
                'change #checkCM':'changeMC'
            },
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');

        var ctx = this;

        $.ajax({
            url: '/php/video.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
        	exData = data.response;
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });

        $.ajax({
            url: '/php/videoLocale.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
        	exLoc = data.response;
            $.ajax({
                url: '/php/subtitles.php',
                type: 'POST',
                dataType: "json",
                data: { id: ctx.options.id, lang: exLoc[0].locale}
            }).done(function(data2) {
                exSubs = data2.response;
            }).fail(function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            });
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });

        $.ajax({
            url: '/php/videoRoles.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
        	exRoles = data.response;
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });

        // Hay que hacer esperar un poco para obtener las respuestas a todas las llamadas necesarias
        var varCheck = setInterval(function()
    	{
            // Seguimos cuando están todos los datos guardados
    		if(exData && exRoles && exLoc && exSubs)
			{
				window.clearInterval(varCheck);
				ctx.render(exData,exRoles,exLoc,exSubs);
			}
		},300);
    },
    render: function (exData,exRoles,exLoc,exSubs)
    {
        var exercise = {'exerciseId':exData.id,'exerciseName':exData.name,'duration':exData.duration,'exerciseThumbnailUri':exData.thumbnailUri,'title':exData.title};

        init('jlachen', 'en', '1', exercise, exSubs, '', '');
        var ctx = this;
        $.get("themes/babelium/templates/prExercise.html",function(data){
            template = _.template(data,{});
            ctx.$el.html(template);
            $("#babelium-exercise-title").append(exData.title);

            var i = 0;

            while(exRoles[i])
            {
                $("#recordedRole").append('<option value='+exRoles[i].characterName+'>'+exRoles[i].characterName+'</option>');
                i++;
            }

            i = 0;

            while(exLoc[i])
            {
                $("#recLocale").append('<option value='+exLoc[i].locale+'>'+exLoc[i].locale+'</option>');
                i++;
            }
        },'html');
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
    },

    changeRole: function ()
    {
        // Para cambiar lo que haya que cambiar al elegir el rol si es que hay que hacer algo en la visualización del video, si solo vale para cuando le das a grabar entonces nada
    },
    
    changeLang: function ()
    {
        /*var x = 0;
        var found = false;
        while(x < prevLoc.length && !found)
        {
            if(prevLoc.response[x].locale === $('#recLocale').value)
            {
                found = true;
            }
            else
            {
                x++;
            }
        }

        if(found)
        {
            var varCheck = setInterval(function()
            {
                var exSubs;
                // Para evitar que se se repita el proceso innecesariamente
                if(!exSubs)
                {
                    $.ajax({
                        url: '/php/subtitles.php',
                        type: 'POST',
                        dataType: "json",
                        data: { id: ctx.options.id, lang: exLoc.response[0].locale}
                    }).done(function(data) {
                        exSubs = data;
                        console.log(data);
                    }).fail(function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    });
                }

                // Seguimos cuando están todos los datos guardados
                if(exSubs)
                {
                    prevSubs = exSubs;

                    window.clearInterval(varCheck);
                    init
                }
            },500);
        }*/
    },

    changeMC: function ()
    {

    }
});