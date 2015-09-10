var EvExerciseView = Backbone.View.extend({
    el: $("#mainBody"),
    events:
    {
        'click #submitEv': 'submit',
        'click #resetEv': 'reset'
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
            data: { name: this.options.name }
        }).done(function(data) {
            // Video (Para los subtitulos necesito el ID y el lenguaje, el ID lo podría coger de Response pero no el lenguaje)
            $.ajax({
                url: '/php/video.php',
                type: 'POST',
                dataType: "json",
                data: { name: data.response.exerciseName }
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
        var ctx = this;
        $.get("themes/babelium/templates/evExercise.html",function(data){
            template = _.template(data,{});
            ctx.$el.html(template);        
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
        },'html');
    },

    submit: function ()
    {
        alert('Success');

        // No está el servicio en el API aun
        /*$.ajax({
            url: '/php/uploadEvaluation.php',
            type: 'POST',
            dataType: "json",
            data: { 
                acc:$('#rateAcc').raty('score'),
                adequacy:$('#rateAdequacy').raty('score'),
                comprehen:$('#rateComprehen').raty('score'),
                fluency:$('#rateFluency').raty('score'),
                range:$('#rateRange').raty('score'),
                intonation:$('#rateIntonation').raty('score'),
                pronunciation:$('#ratePronunciation').raty('score'),
                rhythm:$('#rateRhythm').raty('score'),
                spontaneity:$('#rateSpontaneity').raty('score'),
                overall:$('#rateOverall').raty('score'),
                comment:$('#evComment').val()
            }
        }).done(function(data) {
            alert('Success');
        }).fail(function(xhr, status, error) {
            alert('Error sending the evaluation');
            console.log(xhr + " " + status + " " + error);
        });*/
    },

    reset: function ()
    {
        $('#rateAcc').raty({score:0});
        $('#rateAdequacy').raty({score:0});
        $('#rateComprehen').raty({score:0});
        $('#rateFluency').raty({score:0});
        $('#rateRange').raty({score:0});
        $('#rateIntonation').raty({score:0});
        $('#ratePronunciation').raty({score:0});
        $('#rateRhythm').raty({score:0});
        $('#rateSpontaneity').raty({score:0});
        $('#rateOverall').raty({score:0});
        $('#evComment').val('');
    }
});