var EvExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<section class='exerciseInfo'>"
        +"<p><h2 id='babelium-exercise-title'></h2></p>"
        +"<article>"
        +"<div class='no-overflow'>"
        +"<object type='application/x-shockwave-flash' id='babeliumPlayer' name='babeliumPlayer' align='middle' data='http://babeliumproject.com/babeliumPlayer.swf' width='400' height='380' style='height: 332px; width: 600px;'>"
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

        var ctx = this;

        // Response (Necesito los datos de la respuesta para reproducirla)
        $.ajax({
            url: '/php/response.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.id }
        }).done(function(data) {
            // Video (Para los subtitulos necesito el ID y el lenguaje, el ID lo podría coger de Response pero no el lenguaje)
            $.ajax({
                url: '/php/video.php',
                type: 'POST',
                dataType: "json",
                data: { id: data.response.exerciseId }
            }).done(function(data2) {
                // Subtitulos
                $.ajax({
                    url: '/php/subtitles.php',
                    type: 'POST',
                    dataType: "json",
                    data: { id: data2.response.id, lang: data2.response.language}
                }).done(function(data3) {
                              // respData       exSubs
                    ctx.render(data.response,data3.response);
                }).fail(function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                });
            }).fail(function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            });
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });

                
    },
    render: function (respData,exSubs)
    {
        init("jlachen", "es", "1", respData, exSubs, "", "");

        this.$el.html(this.my_template());
        
        var i = 0;

        $("#babelium-exercise-title").append(respData.title);
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