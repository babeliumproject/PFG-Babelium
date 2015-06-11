var ConfigView = Backbone.View.extend({
    el: $("#mainBody"),
    my_template: _.template("<div id='tabs'>"
            + "<ul>"
            + "<li><a href='#Microphone'>Microphone</a></li>"
            + "<li><a href='#Camera'>Camera</a></li>"
            + "</ul><br><br>"
            + "<div id='Microphone'>"
            + "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' id='babeliumMicTester' width='500' height='400' codebase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab'>"
            + "<param name='movie' value='util/swf/micTester.swf'>"
            + "<param name='quality' value='high'>"
            + "<param name='bgcolor' value='#ffffff'>"
            + "<param name='flashVars' value=''>"
            + "<param name='wmode' value='window'>"
            + "<param name='allowScriptAccess' value='sameDomain'>"
            + "<embed src='util/micTester.swf' quality='high' bgcolor='#ffffff' flashvars='' width='500' height='400' name='babeliumMicTester' align='middle' wmode='window' play='true' loop='false' allowscriptaccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.adobe.com/go/getflashplayer'>"
            + "</object>"
            + "</div>"
            + "<div id='Camera'>"
            + "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' id='babeliumWebcamTester' width='500' height='400' codebase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab'>"
            + "<param name='movie' value='util/swf/webcamTester.swf'>"
            + "<param name='quality' value='high'>"
            + "<param name='bgcolor' value='#ffffff'>"
            + "<param name='flashVars' value=''>"
            + "<param name='wmode' value='window'>"
            + "<param name='allowScriptAccess' value='sameDomain'>"
            + "<embed src='util/webcamTester.swf' quality='high' bgcolor='#ffffff' flashvars='' width='500' height='400' name='babeliumWebcamTester' align='middle' wmode='window' play='true' loop='false' allowscriptaccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.adobe.com/go/getflashplayer'>"
            + "</object>"
            + "</div>"
            ),
    initialize: function ()
    {
        this.render();
        $("#tabs").tabs();
    },
    render: function ()
    {
        this.$el.html(this.my_template());
    }
});