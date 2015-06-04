var ResponseView = Backbone.View.extend({
    tagName: 'article',
    className: 'exercise',
    my_template: _.template("<figure class='thumbnail'>"
            + "<img src='http://babeliumproject.com/resources/images/thumbs/<%= fileIdentifier %>/default.jpg' alt='<%= title %>' width='120' height='90' align='left'/>"
            + "<figcaption><%= duration %></figcaption>"
            + "</figure>"
            + "<div>"
            + "<h1 class='exerciseTitle'>"
            + "<%= title %>"
            + "</h1>"
            + "<div class='HBox dtop'>"
            + "<div><img src='themes/babelium/images/flags/<%= language %>.png' width='16' height='16' alt='flag'/></div>"
            + "<div><%= avgDifficulty %></div>"
            + "<div class='spacer'></div>"
            + "<div><%= addingDate %></div>"
            + "</div>"
            + "<p class='username'>User: <font color='#666'><%= userName %></font></p>"
            + "<p>Role:<%= characterName %></p>"
            + "</div>"
            ),
    events:
            {
                'click': 'goResponse'
            },
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.my_template(this.model.toJSON()));
        return this;
    },
    
    goResponse: function () {
        window.location.href = '#Evaluate/response/'+this.model.attributes.fileIdentifier+'/'+this.model.attributes.id;
    }
});