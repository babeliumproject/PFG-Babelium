var PrExercise = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<h4>Recording configuration</h4><br>"
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
        this.$el.html("<video width='320' height='240' controls>"
        +"<source src='movie.mp4' type='video/mp4'>"
        +"<source src='movie.ogg' type='video/ogg'>"
        +"Your browser does not support the video tag."
        +"</video>");
        this.$el.append(this.my_template());
    },
    
    record: function ()
    {
        // En la documentacion no viene nada de lo de grabar...
    }
});