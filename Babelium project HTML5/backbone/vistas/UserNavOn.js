var UserNavOn = Backbone.View.extend({
    el: $("#userNav"),
    my_template: _.template(
            "<li><a href='#Help/page_1' class='img'><img src='themes/babelium/images/help_icon.png' alt='Help' width='17' height='17'/></a></li>"
            + "<li><a href='#Help/page_1' class='blue'>Help</a></li>"
            + "<li><a href='http://blog.babeliumproject.com/' style='color:blue'>Blog</a></li>"
            + "<li><a href='#Credit' class='yellow'>Credit: <%= creditCount %></a></li><img src='themes/babelium/images/coins_icon.png' alt='coins' width='19px' height='19px'>"
            + "<li><a href='#User_info' style='color:orange'><%= username %></a></li>"
            + "<li><a href='#Home' id='logoff'><img src='themes/babelium/images/close_icon.png' alt='log off' width='19px' height='19px'></a></li>"),
    events:
            {
                "click #logoff": "emptySession"
            },
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.my_template(this.model.toJSON()));
        console.log(this.model);
    },
    emptySession: function () {
        $.ajax({
            url: '/php/endSession.php',
            type: 'POST'
        }).done(function() {
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });
        location.reload();
    }
});


