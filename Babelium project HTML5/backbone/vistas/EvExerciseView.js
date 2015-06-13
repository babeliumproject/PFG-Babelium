var EvExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<section class='exerciseInfo'>"
        +"<p><h2 style='text-align:center' id='babelium-exercise-title'></h2></p>"
        +"<article>"
        +"<div class='no-overflow' style='padding-left:30%'>"
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
        +"<p><h4>All criteria are optional except Overall score:</h4></p>"
        +"<label>Accuracy</label><div id='rateAcc'></div><br>"
        +"<label>Adequacy</label><div id='rateAdequacy'></div><br>"
        +"<label>Comprehensibility</label><div id='rateComprehen'></div><br>"
        +"<label>Fluency</label><div id='rateFluency'></div><br>"
        +"<label>Intonation</label><div id='rateIntonation'></div><br>"
        +"<label>Pronunciation</label><div id='ratePronunciation'></div><br>"
        +"<label>Range</label><div id='rateRange'></div><br>"
        +"<label>Rhythm</label><div id='rateRhythm'></div><br>"
        +"<label>Spontaneity</label><div id='rateSpontaneity'></div><br>"
        +"<label>Overall score</label><div id='rateIntonation'></div><br>"
        +"<input name='comment' id='txtComCheck' type='radio'><label>Include a text comment</label><br>"
        +"<div id='txtComDiv' style='display:none'><textarea id='txtCom'></textarea></div>"
        +"<input name='comment' id='vidComCheck' type='radio'><label>Include a video comment</label><br>"
        +"<div id='vidComDiv' style='display:none'>"
        +"<object type='application/x-shockwave-flash' id='commentRecord' name='commentRecord' align='middle' data='http://babeliumproject.com/babeliumPlayer.swf' width='400' height='380' style='height: 332px; width: 500px;'>"
        +"<param name='quality' value='high'>"
        +"<param name='bgcolor' value='#000000'>"
        +"<param name='allowscriptaccess' value='always'>"
        +"<param name='allowfullscreen' value='true'>"
        +"<param name='wmode' value='window'>"
        +"<param name='flashvars' value='locale=es&amp;forcertmpt=1&amp;jsCallbackObj='>"
        +"</object>"
        +"</div>"
        +"<div style='text-align:center' id='evButtons'><button id='sendEv'>Send evaluation</button><button id='reset'>Reset evaluation</button></div>"
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
        $('#rateAcc').raty();
        $('#rateAdequacy').raty();
        $('#rateComprehen').raty();
        $('#rateFluency').raty();
        $('#rateRange').raty();
        $('#rateIntonation').raty();
        $('#ratePronunciation').raty();
        $('#rateRhythm').raty();
        $('#rateSpontaneity').raty();
        $('#rateOverall').raty();
        var i = 0;

        $("#babelium-exercise-title").append(respData.title);
    },
    
    addTxt: function ()
    {
        $('#txtComDiv').css('display', 'none');
        $('#vidComDiv').css('display', 'none');

        if ($('#txtComCheck').is(':checked'))
        {
            $('#txtComDiv').css('display', 'block');
        }
    },

    addVid: function ()
    {
        $('#txtComDiv').css('display', 'none');
        $('#vidComDiv').css('display', 'none');

        if ($('#vidComCheck').is(':checked'))
        {
            $('#vidComDiv').css('display', 'block');
        }
    }
});