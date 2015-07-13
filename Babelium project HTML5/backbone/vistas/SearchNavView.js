var SearchNavView = Backbone.View.extend({
    el: $("#searchnav"),
    events:
            {
                'click #btnSearch': 'goSearch',
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
        $.get("themes/babelium/templates/searchNav.html",function(data){
            template = _.template(data,{'search':ctx.options.search});
            ctx.$el.html(template);
        },'html');
    },
    goSearch: function ()
    {
        var search = $('#txtSearch').val().replace(' ', '&');
        window.location.href = '#Search/' + search + '/page_1';
    },
    goUpload: function ()
    {
        window.location.href = '#Upload';
    }
});