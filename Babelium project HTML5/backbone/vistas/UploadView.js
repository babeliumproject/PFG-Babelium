var UploadView = Backbone.View.extend({
    el: $("#mainBody"),
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
    }
});