var EvExercise = Backbone.View.extend({
    el: $("#mainBody"),
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
    }
});