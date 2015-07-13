var UserView = Backbone.View.extend({
    el: $("#mainBody"),
    initialize: function () {
        this.render();
    },
    render: function () {
    	var ctx = this;
        $.get("themes/babelium/templates/userInfo.html",function(data){
            template = _.template(data,ctx.model.toJSON());
            ctx.$el.html(template);
        },'html');
    }
});