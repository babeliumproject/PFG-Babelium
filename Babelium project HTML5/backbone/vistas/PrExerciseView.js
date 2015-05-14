var PrExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<section class='exerciseInfo' data-id='526' data-name='<%= this.options.exid %>'>" // AQUI EL URI Y EL ¿ID?
            +"<header><h1 style='margin-left:10px'>NONGOA</h1></header>"
            +"<article class='babeliumPlayer'>"
            +"<div>"
            +"<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'" // NI IDEA
            +"id='babeliumPlayer' width='100%' height='100%'"
            +"codebase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab'>"
            +"<param name='movie' value='util/babeliumPlayer.swf' />"
            +"<param name='quality' value='high' />"
            +"<param name='bgcolor' value='#ffffff' />"
            +"<param name='flashVars' value='locale=eu' />"
            +"<param name='wmode' value='window' />"
            +"<param name='allowScriptAccess' value='sameDomain' />"
            +"<embed src='util/babeliumPlayer.swf' quality='high' bgcolor='#ffffff' flashVars='locale=eu'"
            +"width='100%' height='100%' name='babeliumPlayer' align='middle' wmode='window'"
            +"play='true'"
            +"loop='false'"
            +"quality='high'"
            +"allowScriptAccess='sameDomain'"
            +"type='application/x-shockwave-flash'"
            +"pluginspage='http://www.adobe.com/go/getflashplayer'>"
            +"</embed>"
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
            +"<option value='role 1'>Role 1</option>" // AQUI LOS ROLES
            +"<option value='role 2'>Role 2</option>"
            +"</select>"
            +"<label>Choose a language:</label>"
            +"<select id='recLocale'>"
            +"<option value='eu_ES'>eu_ES</option>" //AQUI EL LENGUAJE
            +"<option value='es_ES'>es_ES</option>"
            +"<option value='fr_FR'>fr_FR</option>"
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

            /*+"<h4>Recording configuration</h4><br>"
            +"<label>Choose a role: </label>"
            +"<select>"
            +"<option value='role1'>Role 1</option>"
            +"<option value='role2'>Role 2</option>"
            +"</select><br>"
            +"<label>Choose a recording method:</label>"
            +"<input type='radio' name='recordType' value='mic'>Only microphone <input type='radio' name='recordType' value='cammic'>Camera and microphone"
            +"<div style='width:20%;text-align:right;display:inline-block'><input type='button' name='recButton' style='background-color:red' value='Rec'>"*/
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
        this.render();
        //¿Y que hago yo con esto? 
        //bpPlayer.exerciseSource(this.options.exid:String):Void
    },
    render: function ()
    {                
        $.ajax({
            url: '/php/llamada.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.exid }
        }).done(function(data) {

        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });
        this.$el.html(this.my_template());
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