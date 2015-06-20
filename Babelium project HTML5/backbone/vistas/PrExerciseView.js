var exData, exRoles, exLoc, exSubs;
var PrExercise = Backbone.View.extend({
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
        +"<article id='recordingEndOptions' class='recordingEndOptions'>"
        +"<label>Available actions:</label><br/>"
        +"<button id='publish' disabled>"//onClick='new ExerciseEvent(ExerciseEvent.SAVE_RESPONSE).dispatch();'
        +"<img src='themes/babelium/images/eo_save_response.png' width='48' height='48' />"
        +"<span>Publish response</span>"
        +"</button><br/>"
        +"<button id='watch' disabled>" //onClick='new ExerciseEvent(ExerciseEvent.WATCH_RESPONSE).dispatch();'
        +"<img src='themes/babelium/images/eo_watch_sim.png' width='48' height='48' />"
        +"<span>Watch response</span>"
        +"</button><br/>"
        +"<button id='reRecord' disabled>" //onClick='new ExerciseEvent(ExerciseEvent.RECORD_AGAIN).dispatch();'
        +"<img src='themes/babelium/images/button_rec.png' width='48' height='48' />"
        +"<span>Record again</span>"
        +"</button><br/>"
        +"<button id='discard'>" //onClick='new ExerciseEvent(ExerciseEvent.RECORDING_ABORTED).dispatch();'
        +"<img src='themes/babelium/images/button_abort.png' width='48' height='48' />"
        +"<span>Discard response</span>"
        +"</button>"
        +"</article>"
        +"<article id='exerciseInfo' class='exerciseInfo aligned'>"
        +"<form name=mform1>"
        +"<label>Choose a role: </label>"
        +"<select id='recordedRole'>"
        +"</select><br>"
        +"<label>Choose a language:</label>"
        +"<select id='recLocale'>"
        +"</select><br>"
        +"<label>Choose a recording method:</label>"
        +"<div class='recordmethod'>"
        +"<input type='radio' id='checkM' name='recordingMethod' value='micOnly' checked>Only microphone</input><br/>"
        +"<input type='radio' id='checkCM' name='recordingMethod' value='micCam'>Camera and microphone</input>"
        +"</div>"
        +"<a id='id_startStopRecordingBtn' alt='Record'>"
        +"<img src='themes/babelium/images/button_rec.png' class='recordButton' alt='Record!' border='0' width='49' height='49' align='right' />"
        +"</a>"
        +"</article>"
        +"<article class='videoInfo'>"
        +"<div class='topbar HBox'>"
        +"<div class='ratyPreview' data-rating='7.5324545454545' data-readonly='true' id='raty-video-preview'></div>"
        +"<div class='spacer'></div>"
        +"<div style='margin-right: 3px'><img src='themes/babelium/images/shield_icon.png' width='20' height='21' alt='Report' align='left'/></div>"
        +"<div><a href='javascript:void(0);' class='yellow'>Report"
        +"</a></div>"
        +"</div>"
        +"<div class='tag'><p></p></div>" //AQUI LOS TAGS
        +"</article>"
        +"</section>"
    ),
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
        this.$el.html(this.my_template());
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