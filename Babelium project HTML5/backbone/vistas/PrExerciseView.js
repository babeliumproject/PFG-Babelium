var PrExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template(/*"<script>function onConnectionReady(compId){console.log(compId);}</script>"
        +"<section class='exerciseInfo' data-id='526' data-name='<%= this.options.exid %>'>" // AQUI EL URI Y EL ¿ID?
        +"<header><h1 style='margin-left:10px'>NONGOA</h1></header>"
        +"<article class='babeliumPlayer'>"
        +"<div>"
        +"<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'"
        +"id='babeliumPlayer' width='100%' height='100%'"
        +"codebase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab'>"
        +"<param name='movie' value='http://babeliumproject.com/babeliumPlayer.swf' />"
        +"<param name='quality' value='high' />"
        +"<param name='bgcolor' value='#ffffff' />"
        +"<param name='flashVars' value='locale=eu' />"
        +"<param name='wmode' value='window' />"
        +"<param name='allowScriptAccess' value='sameDomain' />"
        +"<embed src='http://babeliumproject.com/babeliumPlayer.swf' quality='high' bgcolor='#ffffff' flashVars='locale=eu'"
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
        +"</article>"*/
        "<section class='exerciseInfo'>"
        +"<article>"
        +"<header><h2 id='babelium-exercise-title'></h2></header>"
        +"<script src='js/swfobject.js' language='javascript'></script>"
        +"<script src='js/babelium.moodle.js' language='javascript'></script>"
        +"<div id='flashContent'>"
        +"<p>To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed. </p>"
        +"<script type='text/javascript'>"
        +"var pageHost = ((document.location.protocol == 'https:') ? 'https://' : 'http://');"
        +"document.write('<a href=\"http://www.adobe.com/go/getflashplayer\"><img src=\"\" + pageHost + \"www.adobe.com/images/shared/download_buttons/get_flash_player.gif\" alt=\"Get Adobe Flash player\" /></a>');" 
        +"</script>"
        +"</div>"
        +"<noscript><p>Either scripts and active content are not permitted to run or Adobe Flash Player version 11.1.0 or greater is not installed.</p></noscript>"
        +"<script language='javascript' type='text/javascript'>"
        +"init('babeliumproject.com', 'en', '5', {'responseName':'resp-1347353488483','responseRole':'Shaman','subtitleId':'140','responseThumbnailUri':'default.jpg','exerciseId':'73','exerciseName':'U1MbBtkIGZQ','duration':'32','exerciseThumbnailUri':'default.jpg','title':'Sintel'}, [{'id':'1293','showTime':'1','hideTime':'6','text':'So, what brings you to the land of the gatekeepers?','exerciseRoleId':'265','exerciseRoleName':'Shaman','subtitleId':'140'},{'id':'1294','showTime':'7','hideTime':'10','text':'I'm searching for someone.','exerciseRoleId':'266','exerciseRoleName':'Sintel','subtitleId':'140'},{'id':'1295','showTime':'10.5','hideTime':'15.5','text':'Someone very dear? A kindred spirit?','exerciseRoleId':'265','exerciseRoleName':'Shaman','subtitleId':'140'},{'id':'1296','showTime':'17.05','hideTime':'18.37','text':'A dragon.','exerciseRoleId':'266','exerciseRoleName':'Sintel','subtitleId':'140'},{'id':'1297','showTime':'21','hideTime':'25.6','text':'A dangerous quest for a lone hunter.','exerciseRoleId':'265','exerciseRoleName':'Shaman','subtitleId':'140'},{'id':'1298','showTime':'27.24','hideTime':'30','text':'I've been alone for as long as I can remember.','exerciseRoleId':'266','exerciseRoleName':'Sintel','subtitleId':'140'}], '', '');"
        +"</script>"
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
        +"<option value='Basque'>eu_ES</option>" //AQUI EL LENGUAJE
        +"<option value='Spanish'>es_ES</option>"
        +"<option value='French'>fr_FR</option>"
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
        this.render();
        console.log(this.options.id);
        $.ajax({
            url: '/php/video.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
            console.log(data);
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });
        //¿Y que hago yo con esto? 
        //bpPlayer.exerciseSource(this.options.exid:String):Void
    },
    render: function ()
    {         
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