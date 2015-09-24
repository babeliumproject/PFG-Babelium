var HomeView = Backbone.View.extend({
    el: $("#mainBody"),
    initialize: function ()
    {
        this.render();
    },
    render: function ()
    {   
        var ctx = this;
        $.get("themes/babelium/templates/home.html",function(data){
            template = _.template(data,{});
            ctx.$el.html(template);
        },'html');
    }
});