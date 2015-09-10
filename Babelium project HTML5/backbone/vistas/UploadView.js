var UploadView = Backbone.View.extend({
    el: $("#mainBody"),
    events:
    {
        'click #btnUpload': 'goUpload'
    },
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');
        this.render();
    },
    render: function ()
    {
        var ctx = this;
        $.get("themes/babelium/templates/upload.html",function(data){
            template = _.template(data,{});
            ctx.$el.html(template);
        },'html');
    },
    goUpload: function ()
    {
        alert('Uploaded successfuly');
        // No está el servicio en el API aun
        /*$.ajax({
            url: '/php/uploadNewExercise.php',
            type: 'POST',
            dataType: "json",
            data: { 
                title:$('#upTitle').val(),
                descript:$('#upDescrip').val(),
                tags:$('#upTags').val(),
                diflvl:$('#upDifLvl').val(),
                lang:$('#upLang').val(),
                license:$('#upLic').val(),
                author:$('#upAuthor').val()
            }
        }).done(function(data) {
            alert('Success');
        }).fail(function(xhr, status, error) {
            alert('Error sending the upload');
            console.log(xhr + " " + status + " " + error);
        });*/
    }
});