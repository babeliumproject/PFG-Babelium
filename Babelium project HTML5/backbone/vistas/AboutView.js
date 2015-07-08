var AboutView = Backbone.View.extend({
    el: $("#mainBody"),
    initialize: function ()
    {
        this.render();
    },
    render: function ()
    {   
        var ctx = this;
        $.get("themes/babelium/templates/about.html",function(data){
            template = _.template(data,{});
            ctx.$el.html(template);
        },'html');
    }
});