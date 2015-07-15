var EvaluateView = Backbone.View.extend({
    el: $("#mainBody"),
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');
    },
    render: function ()
    {
        this.$el.html("");
        //Por cada video genera un view de video individual
        this.collection.each(function (response) {
            var vidView = new ResponseView({model: response});
            //Une el view a donde se pone la coleccion
            this.$el.append(vidView.render().el);
        }, this);
        //Añado los botones para navegar entre las paginas
        var ctx = this;
        $.get("themes/babelium/templates/evaluate.html",function(data){
            template = _.template(data,{});
            ctx.$el.append(template);

    		// Control de la paginación
    		var curPag = parseInt(ctx.options.page);
            var numPags = parseInt(ctx.options.pages);

            // Aquí añado información al pie de pagina con la paginación
            if(curPag*10 > ctx.options.numVid)
            {
                $("#pagInfo").html((curPag*10 - 9) +" - "+ctx.options.numVid+" of "+ ctx.options.numVid);
            }
            else
            {
                $("#pagInfo").html((curPag*10 - 9) +" - "+(curPag*10)+" of "+ ctx.options.numVid);
            }

        	if(curPag > 3)
        	{
                if(curPag - 5 <= 1)
                {
                     $('#vidNavB').append("<a href='#Evaluate/page_1'>&lt;</a>");
                }
                else
                {
                     $('#vidNavB').append("<a href='#Evaluate/page_"+ (curPag - 5) +"'>&lt;</a>");
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
                 	    $('#vidNavB').append("<a href='#Evaluate/page_"+ (curPag + cont) +"'>"+(curPag + cont)+"</a>");
    	            }
            	}
            	cont++;
            }
            if(curPag < numPags - 2)
        	{
                if(curPag + 5 >= numPags)
                {
                     $('#vidNavB').append("<a href='#Evaluate/page_"+numPags+"'>&gt;</a>");
                }
                else
                {
                     $('#vidNavB').append("<a href='#Evaluate/page_"+(curPag + 5)+"'>&gt;</a>");
                }
            }
        },'html');
	},
});