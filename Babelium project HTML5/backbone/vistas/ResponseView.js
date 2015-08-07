var ResponseView = Backbone.View.extend({
    tagName: 'article',
    className: 'exercise',
    events:
            {
                'click': 'goResponse'
            },
    initialize: function () {
        this.render();
    },
    render: function () {
        var ctx = this;
        $.get("themes/babelium/templates/response.html",function(data){
            template = _.template(data,ctx.model.toJSON());
            ctx.$el.html(template);
        },'html');
        return this;
    },
    
    goResponse: function () {
        window.location.href = '#Evaluate/response/'+this.model.attributes.fileIdentifier;
    }
});