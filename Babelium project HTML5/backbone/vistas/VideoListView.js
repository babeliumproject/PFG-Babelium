var VideoListView = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<div id='vidNavB' class='vidNavB'>"
            /*+"<% if (this.options.pages == 1) { %>"
             +"<button id='previous' disabled>Previous</button><button id='next' disabled>Next</button>"
             +"<% } else { if(this.options.page == 1){ %>"
             +"<button id='previous' disabled>Previous</button><button id='next'>Next</button>"
             +"<% } else { if(this.options.page == this.options.pages){ %>"
             +"<button id='previous'>Previous</button><button id='next' disabled>Next</button>"
             +"<% } else { %>"
             +"<button id='previous'>Previous</button><button id='next'>Next</button>"
             +"<% }}} %>"*/
            + "</div>"
            ),
    events:
            {
                'click #previous': 'goPrevious',
                'click #next': 'goNext'
            },
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');
    },
    render: function ()
    {
        this.$el.html("");
        //Por cada video genera un view de video individual
        this.collection.each(function (video) {
            var vidView = new VideoView({model: video});
            //Une el view a donde se pone la coleccion
            this.$el.append(vidView.render().el);
        }, this);
        //Añado los botones para navegar entre las paginas
        this.$el.append(this.my_template());

        // Control de la paginación, es posible hacerlo totalmente parametrizable si es necesario
        if(this.options.page - 2 >= 1 && this.options.page +2 <= this.options.pages)
        {
            if(this.options.page - 2 > 1)
            {
                if(this.options.terms)
                {
                    if(this.options.page - 5 <= 1)
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_1'>&lt;</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(this.options.page - 5)+"'>&lt;</a>");
                    }
                }
                else
                {
                    if(this.options.page - 5 <= 1)
                    {
                         $('#vidNavB').append("<a href='#Practice/page_1'>&lt;</a>");
                    }
                    else
                    {
                         $('#vidNavB').append("<a href='#Practice/page_"+ (this.options.page - 5) +"'>&lt;</a>");
                    }
                }
            }
            
            for(var i = -2; i < 3; i++)
            {
                if (this.options.terms)
                {
                    $('#vidNavB').append("<a href='#Search/" + this.options.terms + "/page_" + (this.options.page + i) + "'>" + (this.options.page + i) + "</a>");
                }
                else
                {
                    $('#vidNavB').append("<a href='#Practice/page_" + (this.options.page + i) + "'>" + (this.options.page + i) + "</a>");
                }
            }
            
            if(this.options.page + 2 < this.options.pages)
            {
                if(this.options.terms)
                {
                    if(this.options.page + 5 >= this.options.pages)
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(this.options.pages)+"'>&gt;</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(this.options.page+5)+"'>&gt;</a>");
                    }
                }
                else
                {
                    if(this.options.page + 5 >= this.options.pages)
                    {
                        $('#vidNavB').append("<a href='#Practice/page_"+(this.options.pages)+"'>&gt;</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Practice/page_"+(this.options.page+5)+"'>&gt;</a>");
                    }
                }
            }
        }
        else
        {
            if(this.options.page - 2 >= 1 && this.options.page +2 > this.options.pages)
            {
                if(this.options.page - 2 > 1)
                {
                    if(this.options.terms)
                    {
                        if(this.options.page - 5 <= 1)
                        {
                            $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_1'>&lt;</a>");
                        }
                        else
                        {
                            $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(this.options.page - 5)+"'>&lt;</a>");
                        }
                    }
                    else
                    {
                        if(this.options.page - 5 <= 1)
                        {
                             $('#vidNavB').append("<a href='#Practice/page_1'>&lt;</a>");
                        }
                        else
                        {
                             $('#vidNavB').append("<a href='#Practice/page_"+ (this.options.page - 5) +"'>&lt;</a>");
                        }
                    }
                }

                for(var i = -2; i < this.options.pages; i++)
                {
                    if (this.options.terms)
                    {
                        $('#vidNavB').append("<a href='#Search/" + this.options.terms + "/page_" + (this.options.page + i) + "'>" + (this.options.page + i) + "</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Practice/page_" + (this.options.page + i) + "'>" + (this.options.page + i) + "</a>");
                    }
                }
            }
            else
            {
                if(this.options.page - 2 < 1 && this.options.page +2 <= this.options.pages)
                {
                    for(var i = 1; i < 5; i++)
                    {
                        if (this.options.terms)
                        {
                            $('#vidNavB').append("<a href='#Search/" + this.options.terms + "/page_" + i + "'>" + i + "</a>");
                        }
                        else
                        {
                            $('#vidNavB').append("<a href='#Practice/page_" + i + "'>" + i + "</a>");
                        }
                    }
                    
                    if(this.options.page + 2 < this.options.pages)
                    {
                        if(this.options.terms)
                        {
                            if(this.options.page + 5 >= this.options.pages)
                            {
                                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(this.options.pages)+"'>&gt;</a>");
                            }
                            else
                            {
                                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(this.options.page+5)+"'>&gt;</a>");
                            }
                        }
                        else
                        {
                            if(this.options.page + 5 >= this.options.pages)
                            {
                                $('#vidNavB').append("<a href='#Practice/page_"+(this.options.pages)+"'>&gt;</a>");
                            }
                            else
                            {
                                $('#vidNavB').append("<a href='#Practice/page_"+(this.options.page+5)+"'>&gt;</a>");
                            }
                        }
                    }
                }
                else
                {
                    for (var i = 1; i <= this.options.pages; i++)
                    {
                        if (this.options.terms)
                        {
                            $('#vidNavB').append("<a href='#Search/" + this.options.terms + "/page_" + i + "'>" + i + "</a>");
                        }
                        else
                        {
                            $('#vidNavB').append("<a href='#Practice/page_" + i + "'>" + i + "</a>");
                        }
                    }
                }
            }
        }

        return this;
    },
    goPrevious: function ()
    {
        var n = this.options.page--;

        if (this.options.terms)
        {
            window.location.href = '#Search/' + this.options.terms + '/page_' + n;
        }
        else
        {
            window.location.href = '#Practice/page_' + n;
        }
    },
    goNext: function ()
    {
        var n = this.options.page++;

        if (this.options.terms)
        {
            window.location.href = '#Search/' + this.options.terms + '/page_' + n;
        }
        else
        {
            window.location.href = '#Practice/page_' + n;
        }
    }
});