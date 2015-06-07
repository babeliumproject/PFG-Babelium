var EvExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<section class='exerciseInfo'>"
        +"<p><h2 id='babelium-exercise-title'></h2></p>"
        +"<article>"
        +"<div class='no-overflow'>"
        +"<object type='application/x-shockwave-flash' id='babeliumPlayer' name='babeliumPlayer' align='middle' data='http://babeliumproject.com/babeliumPlayer.swf' width='640' height='380' style='height: 400px; width: 900px;'>"
        +"<param name='quality' value='high'>"
        +"<param name='bgcolor' value='#000000'>"
        +"<param name='allowscriptaccess' value='always'>"
        +"<param name='allowfullscreen' value='true'>"
        +"<param name='wmode' value='window'>"
        +"<param name='flashvars' value='locale=es&amp;forcertmpt=1&amp;jsCallbackObj='>"
        +"</object>"
        +"</div>"
        +"</article>"
        +"<article id='exerciseInfo' class='evaluation aligned'>"
        +"<p><h2>Rate the user's response</h2></p>"
        +"<p><h4>Compulsory evaluation data:</h4></p>"
        +"<label>Intonation & accent</label><select><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select><br>"
        +"<label>Pronunciation</label><select><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select><br>"
        +"<label>Rhythm</label><select><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select><br>"
        +"<label>Spontaneity</label><select><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select><br>"
        +"<label>Overall Score</label><select><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select><br>"
        +"<input id='txtComCheck' type='checkbox'><label>Include a text comment</label><br>"
        +"<div id='txtComDiv' style='display:none'><textarea id='txtCom'></textarea></div>"
        +"<input id='vidComCheck' type='checkbox'><label>Include a video comment</label><br>"
        +"<div id='vidComDiv' style='display:none'>Aquí va el video</div>"
        +"<div style='text-align:center, padding-left:10px' id='evButtons'><button id='sendEv'>Send evaluation</button><button id='reset'>Reset evaluation</button>"
        +"</article>"
        +"</section>"
    ),
    events:
            {
                'change #txtComCheck' : 'addTxt',
                'change #vidComCheck' : 'addVid'
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

//init("babeliumproject.com", "es", "1", {"responseName":"resp-1347271137704","responseRole":"Shaman","subtitleId":"140","responseThumbnailUri":"default.jpg","exerciseId":"73","exerciseName":"U1MbBtkIGZQ","duration":"32","exerciseThumbnailUri":"default.jpg","title":"Sintel"}, [{"id":"1293","showTime":"1","hideTime":"6","text":"So, what brings you to the land of the gatekeepers?","exerciseRoleId":"265","exerciseRoleName":"Shaman","subtitleId":"140"},{"id":"1294","showTime":"7","hideTime":"10","text":"I'm searching for someone.","exerciseRoleId":"266","exerciseRoleName":"Sintel","subtitleId":"140"},{"id":"1295","showTime":"10.5","hideTime":"15.5","text":"Someone very dear? A kindred spirit?","exerciseRoleId":"265","exerciseRoleName":"Shaman","subtitleId":"140"},{"id":"1296","showTime":"17.05","hideTime":"18.37","text":"A dragon.","exerciseRoleId":"266","exerciseRoleName":"Sintel","subtitleId":"140"},{"id":"1297","showTime":"21","hideTime":"25.6","text":"A dangerous quest for a lone hunter.","exerciseRoleId":"265","exerciseRoleName":"Shaman","subtitleId":"140"},{"id":"1298","showTime":"27.24","hideTime":"30","text":"I've been alone for as long as I can remember.","exerciseRoleId":"266","exerciseRoleName":"Sintel","subtitleId":"140"}], "", "");
                      
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
    },
    render: function (exData,respData,exSubs)
    {
        var exercise = {'exerciseId':exData.response.id,'exerciseName':exData.response.name,'duration':exData.response.duration,'exerciseThumbnailUri':exData.response.thumbnailUri,'title':exData.response.title};
console.log(respData);
        console.log("jlachen,en,1,"+ JSON.stringify(respData)+","+ JSON.stringify(exSubs)+",'',''");
        init("babeliumproject.com", "es", "1", {"responseName":"resp-1347271137704","responseRole":"Shaman","subtitleId":"140","responseThumbnailUri":"default.jpg","exerciseId":"73","exerciseName":"U1MbBtkIGZQ","duration":"32","exerciseThumbnailUri":"default.jpg","title":"Sintel"}, [{"id":"1293","showTime":"1","hideTime":"6","text":"So, what brings you to the land of the gatekeepers?","exerciseRoleId":"265","exerciseRoleName":"Shaman","subtitleId":"140"},{"id":"1294","showTime":"7","hideTime":"10","text":"I'm searching for someone.","exerciseRoleId":"266","exerciseRoleName":"Sintel","subtitleId":"140"},{"id":"1295","showTime":"10.5","hideTime":"15.5","text":"Someone very dear? A kindred spirit?","exerciseRoleId":"265","exerciseRoleName":"Shaman","subtitleId":"140"},{"id":"1296","showTime":"17.05","hideTime":"18.37","text":"A dragon.","exerciseRoleId":"266","exerciseRoleName":"Sintel","subtitleId":"140"},{"id":"1297","showTime":"21","hideTime":"25.6","text":"A dangerous quest for a lone hunter.","exerciseRoleId":"265","exerciseRoleName":"Shaman","subtitleId":"140"},{"id":"1298","showTime":"27.24","hideTime":"30","text":"I've been alone for as long as I can remember.","exerciseRoleId":"266","exerciseRoleName":"Sintel","subtitleId":"140"}], "", "");

        this.$el.html(this.my_template());
        
        var i = 0;

        $("#babelium-exercise-title").append(exData.response.title);
    },
    
    addTxt: function ()
    {
        if($('#txtComCheck').is(':checked'))
        {
            $('#txtComDiv').css('display','block');
        }
        else
        {
            $('#txtComDiv').css('display','none');   
        }
    },

    addVid: function ()
    {
        if($('#vidComCheck').is(':checked'))
        {
            $('#vidComDiv').css('display','block');
        }
        else
        {
            $('#vidComDiv').css('display','none');   
        }
    }
});