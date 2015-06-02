var EvExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<section class='exerciseInfo'>"
        +"<article>"
        +"<div class='no-overflow'>"
        +"<h2 id='babelium-exercise-title'>Sintel</h2>"
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
        +"<article id='exerciseInfo' class='exerciseInfo aligned'>  "
        +"<label>Choose a role: </label>"
        +"<select id='recRole'>"
        +"</select>"
        +"<label>Choose a language:</label>"
        +"<select id='recLocale'>"
        +"</select>"
        +"<label>Choose a recording method:</label>"
        +"<div class='recordmethod'>"
        +"<input type='radio' name='recordingMethod' value='micOnly' checked>Only microphone</input><br/>"
        +"<input type='radio' name='recordingMethod' value='micCam'>Camera and microphone</input>"
        +"</div>"
        +"<a id='record' alt='Record'>"
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
                'click #discard': 'discard'
            },
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');

        var exData, exRoles, exLoc;

        $.ajax({
            url: '/php/video.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
        	exData = data;
        	console.log(exData);
            console.log(data);
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });

        $.ajax({
            url: '/php/subtitles.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
	        console.log(data);
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
        	exLoc = data;
            console.log(data);
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
        	exRoles = data;
	        console.log(data);
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });

        var ctx = this;
        // Hay que hacer esperar un poco para obtener las respuestas a todas las llamadas necesarias
        var varCheck = setInterval(function()
    	{
    		if(exData && exRoles && exLoc)
			{
				window.clearInterval(varCheck);
				ctx.render(exData,exRoles,exLoc);
			}
		},500);
        
        //¿Y que hago yo con esto? 
        //bpPlayer.exerciseSource(this.options.exid:String):Void
    },
    render: function (exData,exRoles,exLoc)
    {
        init('jlachen', 'en', '1', {'exerciseId':exData.response.id,'exerciseName':exData.response.name,'duration':exData.response.duration,'exerciseThumbnailUri':exData.response.thumbnailUri,'title':exData.response.title}, [{'id':'1540','showTime':'95','hideTime':'105','text':'\u00bfPor qu\u00e9 se est\u00e1n derritiendo los polos? \u00bfCu\u00e1les ser\u00e1n las consecuencias?','exerciseRoleId':'316','exerciseRoleName':'Estudiante','subtitleId':'173'},{'id':'1541','showTime':'156','hideTime':'210','text':'\u00bfQu\u00e9 medidas de ahorro crees que podr\u00edas llevar a cabo para contribuir a parar el cambio clim\u00e1tico?','exerciseRoleId':'316','exerciseRoleName':'Estudiante','subtitleId':'173'}], '', '');
        this.$el.html(this.my_template());
        
        var i = 0;

        while(exRoles.response[i])
    	{
    		$("#recRole").append('<option value='+exRoles.response[i].characterName+'>'+exRoles.response[i].characterName+'</option>');
    		i++;
    	}

    	i = 0;

    	while(exLoc.response[i])
    	{
    		$("#recLocale").append('<option value='+exLoc.response[i].locale+'>'+exLoc.response[i].locale+'</option>');
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
    }
});