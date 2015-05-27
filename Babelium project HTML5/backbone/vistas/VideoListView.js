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

		var curPag = parseInt(this.options.page);
        var numPags = parseInt(this.options.pages);

        if(this.options.terms)
        {
        	if(curPag > 3)
        	{
	            if(curPag - 5 <= 1)
	            {
	                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_1'>&lt;</a>");
	            }
	            else
	            {
	                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(curPag - 5)+"'>&lt;</a>");
	            }
	        }
        }
        else
        {
        	if(curPag > 3)
        	{
	            if(curPag - 5 <= 1)
	            {
	                 $('#vidNavB').append("<a href='#Practice/page_1'>&lt;</a>");
	            }
	            else
	            {
	                 $('#vidNavB').append("<a href='#Practice/page_"+ (curPag - 5) +"'>&lt;</a>");
	            }
	        }
        }

		// Creo un contador y una condicion para terminar la iteración para poder actualizar la
        // condicion dinamicamente en caso de que se cumplan ciertos casos
        var cont = -2;
        var condition = 3;
        
        while(cont < condition)
        {
        	if(curPag + cont < 1)
        	{
        		condition++;
        	}
        	else
        	{
        		if(curPag + cont > numPags)
        		{

        		}
        		else
        		{
        			if(this.options.terms)
	                {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(curPag + cont)+"'>"+(curPag + cont)+"</a>");
                    }
	                else
	                {
             		    $('#vidNavB').append("<a href='#Practice/page_"+ (curPag + cont) +"'>"+(curPag + cont)+"</a>");
	                }
        		}
        	}
        	cont++;
        }
        if(this.options.terms)
        {
        	if(curPag < numPags - 2)
        	{
	            if(curPag + 5 >= numPags)
	            {
	                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+numPags+"'>&lt;</a>");
	            }
	            else
	            {
	                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(curPag + 5)+"'>&lt;</a>");
	            }
        	}
        }
        else
        {
        	if(curPag < numPags - 2)
        	{
	            if(curPag + 5 >= numPags)
	            {
	                 $('#vidNavB').append("<a href='#Practice/page_"+numPags+"'>&gt;</a>");
	            }
	            else
	            {
	                 $('#vidNavB').append("<a href='#Practice/page_"+(curPag + 5)+"'>&gt;</a>");
	            }
	        }
        }
	},
        // Control de la paginación, es posible hacerlo totalmente parametrizable si es necesario
        /*var curPag = parseInt(this.options.page);
        var numPags = parseInt(this.options.pages);
        if(curPag - 2 >= 1 && curPag +2 <= numPags)
        {
            if(curPag - 2 > 1)
            {
                if(this.options.terms)
                {
                    if(curPag - 5 <= 1)
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_1'>&lt;</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(curPag - 5)+"'>&lt;</a>");
                    }
                }
                else
                {
                    if(curPag - 5 <= 1)
                    {
                         $('#vidNavB').append("<a href='#Practice/page_1'>&lt;</a>");
                    }
                    else
                    {
                         $('#vidNavB').append("<a href='#Practice/page_"+ (curPag - 5) +"'>&lt;</a>");
                    }
                }
            }
            
            for(var i = -2; i < 3; i++)
            {
                if (this.options.terms)
                {
                    $('#vidNavB').append("<a href='#Search/" + this.options.terms + "/page_" + (curPag + i) + "'>" + (curPag + i) + "</a>");
                }
                else
                {
                    $('#vidNavB').append("<a href='#Practice/page_" + (curPag + i) + "'>" + (curPag + i) + "</a>");
                }
            }
            
            if(curPag + 2 < numPags)
            {
                if(this.options.terms)
                {
                    if(curPag + 5 >= numPags)
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(numPags)+"'>&gt;</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(this.options.page+5)+"'>&gt;</a>");
                    }
                }
                else
                {
                    if(curPag + 5 >= numPags)
                    {
                        $('#vidNavB').append("<a href='#Practice/page_"+(numPags)+"'>&gt;</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Practice/page_"+(curPag+5)+"'>&gt;</a>");
                    }
                }
            }
        }
        else
        {
            if(curPag - 2 >= 1 && curPag +2 > numPags)
            {
                if(curPag - 2 > 1)
                {
                    if(this.options.terms)
                    {
                        if(curPag - 5 <= 1)
                        {
                            $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_1'>&lt;</a>");
                        }
                        else
                        {
                            $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(curPag - 5)+"'>&lt;</a>");
                        }
                    }
                    else
                    {
                        if(curPag - 5 <= 1)
                        {
                             $('#vidNavB').append("<a href='#Practice/page_1'>&lt;</a>");
                        }
                        else
                        {
                             $('#vidNavB').append("<a href='#Practice/page_"+(curPag - 5)+"'>&lt;</a>");
                        }
                    }
                }

                for(var i = -2; i < numPags; i++)
                {
                    if (this.options.terms)
                    {
                        $('#vidNavB').append("<a href='#Search/" + this.options.terms + "/page_" + (curPag + i) + "'>" + (curPag + i) + "</a>");
                    }
                    else
                    {
                        $('#vidNavB').append("<a href='#Practice/page_" + (curPag + i) + "'>" + (curPag + i) + "</a>");
                    }
                }
            }
            else
            {
                if(curPag - 2 < 1 && curPag +2 <= numPags)
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
                    
                    if(curPag + 2 < numPags)
                    {
                        if(this.options.terms)
                        {
                            if(curPag + 5 >= numPags)
                            {
                                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(numPags)+"'>&gt;</a>");
                            }
                            else
                            {
                                $('#vidNavB').append("<a href='#Search/"+this.options.terms+"/page_"+(curPag+5)+"'>&gt;</a>");
                            }
                        }
                        else
                        {
                            if(curPag + 5 >= numPags)
                            {
                                $('#vidNavB').append("<a href='#Practice/page_"+(numPags)+"'>&gt;</a>");
                            }
                            else
                            {
                                $('#vidNavB').append("<a href='#Practice/page_"+(curPag+5)+"'>&gt;</a>");
                            }
                        }
                    }
                }
                else
                {
                    for (var i = 1; i <= numPags; i++)
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
    },*/
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