var PrExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<section class='exerciseInfo' data-id='526' data-name='<% this.options.exid %>'>"
            +"<header><h1>NONGOA</h1></header>"
            +"<article class='babeliumPlayer'>"
            +"<div>"
            +"<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'"
            +"id='babeliumPlayer' width='100%' height='100%'"
            +"codebase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab'>"
            +"<param name='movie' value='util/swf/babeliumPlayer.swf' />"
            +"<param name='quality' value='high' />"
            +"<param name='bgcolor' value='#ffffff' />"
            +"<param name='flashVars' value='locale=eu' />"
            +"<param name='wmode' value='window' />"
            +"<param name='allowScriptAccess' value='sameDomain' />"
            +"<embed src='util/babeliumPlayer.swf' quality='high' bgcolor='#ffffff' flashVars='locale=eu'"
            +"width='100%' height='100%' name='babeliumPlayer' align='middle' wmode='window'"
            +"play='true'"
            +"loop='false'"
            +"quality='high'"
            +"allowScriptAccess='sameDomain'"
            +"type='application/x-shockwave-flash'"
            +"pluginspage='http://www.adobe.com/go/getflashplayer'>"
            +"</embed>"
            +"</object>"
            +"</div>"
            +"</article>"
            +"<h4>Recording configuration</h4><br>"
            +"<label>Choose a role</label>"
            +"<select>"
            //¿Y de donde me saco yo los roles?
            +"<option value='role1'>Role 1</option>"
            +"<option value='role2'>Role 2</option>"
            +"</select><br>"
            +"<label>Choose a recording method:</label>"
            +"<input type='radio' name='recordType' value='mic'>Only microphone <input type='radio' name='recordType' value='cammic'>Camera and microphone"
            +"<div style='width:20%;text-align:right;display:inline-block'><input type='button' name='recButton' style='background-color:red' value='Rec'>"
            ),
    events:
            {
                'click button': 'record'
            },
    initialize: function (options)
    {
        this.options = options;
        _.bindAll(this, 'render');
        this.render();
        //¿Y que hago yo con esto? 
        //bpPlayer.exerciseSource(this.options.exid:String):Void
    },
    render: function ()
    {
        this.$el.html(this.my_template());
        
        $.ajax({
            url: '/php/llamada.php',
            type: 'POST',
            dataType: "json",
            data: { id: this.options.exid }
        }).done(function(data) {
            alert('BIEN');
            console.log(data);
        }).fail(function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        });
    },
    
    record: function ()
    {
        // En la documentacion no viene nada de lo de grabar...
    }
});