var exData, exRoles, exLoc, exSubs;
var PrExercise = Backbone.View.extend({
    el: $("#mainBody"),
    events:
            {
                'click #id_startStopRecordingBtn': 'startStopRecording',
                'click #id_submitbutton': 'submitRecord',
                'click #id_viewExerciseBtn': 'playVideo'
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
            data: { name: this.options.name }
        }).done(function(data) {
        	exData = data.response;
            $.ajax({
                url: '/php/subtitles.php',
                type: 'POST',
                dataType: "json",
                data: { id: exData.id, lang: exData.language}
            }).done(function(data2) {
                exSubs = data2.response;
                $.ajax({
                    url: '/php/videoRoles.php',
                    type: 'POST',
                    dataType: "json",
                    data: { id: exData.id }
                }).done(function(data) {
                    exRoles = data.response;
                    ctx.render(exData,exRoles,exSubs);
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
    render: function (exData,exRoles,exSubs)
    {
        var exercise = {'exerciseId':exData.id,'exerciseName':exData.name,'duration':exData.duration,'exerciseThumbnailUri':exData.thumbnailUri,'title':exData.title};
        init('jlachen', 'en', '1', exercise, exSubs, '', '');
        var ctx = this;
        $.get("themes/babelium/templates/prExercise.html",function(data){
            template = _.template(data,{});
            ctx.$el.html(template);
            $("#babelium-exercise-title").append(exData.title);
            
            // Fijo los tags en su sitio
            var tags = exData.tags.split(',');
            for(var t = 0 ; t < tags.length ; t++)
            {
                $("#prTags").append(document.createTextNode(tags[t]));    
            }
            
            var i = 0;

            while(exRoles[i])
            {
                $("#id_roleCombo").append('<option value='+exRoles[i].characterName+'>'+exRoles[i].characterName+'</option>');
                i++;
            }

            i = 0;
            
            $("#recLocale").append('<option value='+exData.language+'>'+exData.language+'</option>');

        },'html');
    },
    
    startStopRecording: function ()
    {
		// Muestra los botones de grabación
		$('#exerciseInfo').css('display','none');
		$('#recordingEndOptions').css('display','inline-block');

    },

    submitRecord: function ()
    {
        alert('Success');
    },

    playVideo : function ()
    {
        // Muestra los botones pre grabación
        $('#recordingEndOptions').css('display','none');
        $('#exerciseInfo').css('display','inline-block');        
    }
});