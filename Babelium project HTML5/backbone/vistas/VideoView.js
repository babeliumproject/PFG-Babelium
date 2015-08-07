var VideoView = Backbone.View.extend({
    tagName: 'article',
    className: 'exercise',
    events:
            {
                'click': 'goVideo'
            },
    initialize: function () {
        this.render();
    },
    render: function () {
        var ctx = this;
        $.get("themes/babelium/templates/video.html",function(data){
            template = _.template(data,ctx.model.toJSON());
            ctx.$el.html(template);
        },'html');
        return this;
    },
    
    goVideo: function () {
        window.location.href = '#Practice/exercise/'+this.model.attributes.name;
    }
});