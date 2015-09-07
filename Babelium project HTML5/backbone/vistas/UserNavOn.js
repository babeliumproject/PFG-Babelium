var UserNavOn = Backbone.View.extend({
    el: $("#userNav"),
    events:
            {
                "click #logoff": "emptySession"
            },
    initialize: function () {
        this.render();
    },
    render: function () {
        var ctx = this;
        $.get("themes/babelium/templates/userNavOn.html",function(data){
            template = _.template(data,ctx.model.toJSON());
            ctx.$el.html(template);
        },'html');
    },
    emptySession: function () {
        $.ajax({
            url: '/php/endSession.php',
            type: 'POST'
        }).done(function() {
        }).fail(function(xhr, status, error) {
            alert("Error loading session");
        });
        location.reload();
    }
});


