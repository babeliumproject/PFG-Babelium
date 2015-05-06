var SearchNavView = Backbone.View.extend({
    el: $("#searchnav"),
    my_template: _.template("<button id='btnUpload' class='upload'>Upload</button>"
            + "<% if (this.options.search) { %>"
            + "<input id='txtSearch' type='text' placeholder='Enter your search terms...' class='search boxFlex' />"
            + "<button id='btnSearch'>Search</button>"
            + "<% } %>"
            ),
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
        this.$el.html(this.my_template());
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