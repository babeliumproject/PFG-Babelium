var HelpView = Backbone.View.extend({
    el: $("#mainBody"),
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
        var ctx = this;
        $.get("themes/babelium/templates/help.html",function(data){
            template = _.template(data,{'page':ctx.options.page});
            ctx.$el.html(template);
        },'html');
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
        window.location.href = '#Help/page_' + 3;
    },
    go4: function ()
    {
        window.location.href = '#Help/page_' + 4;
    }
});