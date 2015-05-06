var HelpView = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<div class='helpBtn'>"
            + "<button id='help1'>1</button><button id='help2'>2</button><button id='help3'>3</button><button id='help4'>4</button>"
            + "<% if (this.options.page == 1) { %>"
            + "<div><h3>How to configure your video/audio devices</h3>"
            + "<video width='320' height='240' controls>"
            + "<source src='movie.mp4' type='video/mp4'>"
            + "Your browser does not support the video tag.</video></div>"
            + "<% } else { if(this.options.page == 2){ %>"
            + "<div><h3>How to practice a language</h3>"
            + "<video width='320' height='240' controls>"
            + "<source src='movie.mp4' type='video/mp4'>"
            + "Your browser does not support the video tag.</video></div>"
            + "<% } else { if(this.options.page == 3){ %>"
            + "<div><h3>How to evaluate the work of other users</h3>"
            + "<video width='320' height='240' controls>"
            + "<source src='movie.mp4' type='video/mp4'>"
            + "Your browser does not support the video tag.</video></div>"
            + "<% } else { if(this.options.page == 4){ %>"
            + "<div><h3>How to subtitle a video</h3>"
            + "<video width='320' height='240' controls>"
            + "<source src='movie.mp4' type='video/mp4'>"
            + "Your browser does not support the video tag.</video></div>"
            + "<% }}}} %></div>"
            ),
    events:
            {
                'click #help1': 'go1',
                'click #help2': 'go2',
                'click #help3': 'go3',
                'click #help4': 'go4'
            },
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');
        this.render();
    },
    render: function ()
    {
        this.$el.html(this.my_template());
    },
    go1: function ()
    {
        window.location.href = '#Help/page_' + 1;
    },
    go2: function ()
    {
        window.location.href = '#Help/page_' + 2;
    },
    go3: function ()
    {
        var n = 3;
        window.location.href = '#Help/page_' + 3;
    },
    go4: function ()
    {
        var n = 4;
        window.location.href = '#Help/page_' + 4;
    }
});