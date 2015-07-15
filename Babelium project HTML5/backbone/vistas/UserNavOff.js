var UserNavOff = Backbone.View.extend({
    el: $("#userNav"),
    events:
            {
                'click #loginD': 'goLogin',
                'click #regisD': 'goRegis'
            },
    initialize: function () {
        this.render();
    },
    render: function () {
        var ctx = this;
        $.get("themes/babelium/templates/userNavOff.html",function(data){
            template = _.template(data,{});
            ctx.$el.html(template);
        },'html');
    },
    goLogin: function () {

        $("#loginDialog").dialog({
            open: function () {

            },
            buttons: [
                {
                    text: "Log in",
                    click: function ()
                    {
                        // Al hacer clic en log in guardo los valores
                        var user = $("#user").val();
                        var pass = $("#password").val();

                        var context = $(this);
                        $.ajax({
                            url: '/php/login.php',
                            type: 'POST',
                            dataType: "json",
                            data: { 
                                user: user,
                                pass: pass
                            }
                        }).done(function(data) {
                            if(data.response !== "wrong_password" && data.response !== "wrong_user")
                            {
                                alert("Login successful");
                                context.dialog("close");
                                var currentUser = new User();
                                currentUser.set(data.response);
                                new UserNavOn({model: currentUser});
                            }
                            else
                            {
                                if(data.response === "wrong_password")
                                {
                                    alert("Password is not correct");
                                    $('#password').val("");
                                }
                                else
                                {
                                    alert("User is not correct");
                                    $('#user').val("");
                                    $('#password').val("");
                                }
                            }
                        }).fail(function(xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        });
                    }
                },
                {
                    text: "Close",
                    click: function ()
                    {
                        $(this).dialog("close");
                        $('#user').val("");
                        $('#password').val("");
                    }
                }
            ]
        });
    },
    goRegis: function () {
        $("#regisDialog").dialog({
            open: function () {

            },
            buttons: [
                {
                    text: "Register",
                    click: function ()
                    {
                        if($('passwordReg2').val() === $('passwordReg').val() && $("#userReg").val() !== '' && $("#emailReg").val() !== '' && $("#passwordReg").val() !== '' && $("#passwordReg2").val() !== '' && $("mLang").val() !== '')
                        {
                            $.ajax({
                                url: '/php/register.php',
                                type: 'POST',
                                dataType: "json",
                                data: {
                                    'userName': $("#userReg").val(), 
                                    'email': $("#emailReg").val(), 
                                    'password': $("#passwordReg").val(), 
                                    'realName': $("#nReal").val(), 
                                    'realLastname': $("aReal").val(), 
                                    'languages': [{'language':$("mLang").val(),'level':'7','positivesToNextLevel':'15','purpose':'evaluate'},{'language':$("oLang").val(),'level':$("#oLangLvl").val(),'positivesToNextLevel':'15','purpose':'evaluate'},{'language':$("#iLang").val(),'level':$("#iLangLvl").val(),'positivesToNextLevel':'15','purpose':'practice'}]
                                }
                            }).done(function(data) {
                                if(data.response === "")
                                {
                                    alert("Register successful.");
                                    $(this).dialog("close");
                                }
                                else
                                {
                                    alert("Email already in use.");
                                    $("#userReg").val("");
                                    $("#emailReg").val("");
                                    $("#passwordReg").val("");
                                    $("#passwordReg2").val("");
                                    $("#nReal").val("");
                                    $("aReal").val("");
                                    $("mLang").val("");
                                    $("#oLang").val("");
                                    $("#oLangLvl").val("");
                                    $("#iLang").val("");
                                    $("#iLangLvl").val("");
                                }
                            }).fail(function(xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            });
                        }
                        else
                        {
                            alert('Error, try again');
                            $("#passwordReg").val("");
                            $("#passwordReg2").val("");
                        }
                    }
                },
                {
                    text: "Close",
                    click: function ()
                    {
                        $(this).dialog("close");

                        $("#userReg").val("");
                        $("#emailReg").val("");
                        $("#passwordReg").val("");
                        $("#nReal").val("");
                        $("aReal").val("");
                        $("mLang").val("");
                        $("#oLang").val("");
                        $("#oLangLvl").val("");
                        $("#iLang").val("");
                        $("#iLangLvl").val("");
                    }
                }
            ]
        });
    }
});