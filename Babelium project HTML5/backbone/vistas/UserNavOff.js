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
            open: function ()
            {
            	// Al usar la tecla enter en el nombre de usuario se ejecuta el login
            	$("#user").keypress(function(e) {
			      if (e.keyCode == $.ui.keyCode.ENTER) {
			        $("#bLogIn").trigger("click");
			      }
			    });
				
				// Al usar la tecla enter en la contraseña se ejecuta el login
            	$("#password").keypress(function(e) {
			      if (e.keyCode == $.ui.keyCode.ENTER) {
			        $("#bLogIn").trigger("click");
			      }
			    });
            },
            buttons: [
                {
                    text: "Log in",
                    id: "bLogIn",
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
                            if(data.response !== "wrong_password" && data.response !== "wrong_user" && data.response !== "inactive_user")
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
                                    if(data.response === "wrong_user")
                                    {                                        
                                        alert("User is not correct");
                                        $('#user').val("");
                                        $('#password').val("");
                                    }
                                    else
                                    {
                                        alert("User is not active");
                                        $('#password').val("");
                                    }
                                }
                            }
                        }).fail(function(xhr, status, error) {
                            alert("Error: Login failed");
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
                            var languages = [{'language':$("#mLang").val(),'level':'7','positivesToNextLevel':'15','purpose':'evaluate'},{'language':$("#oLang").val(),'level':$("#oLangLvl").val(),'positivesToNextLevel':'15','purpose':'evaluate'},{'language':$("#iLang").val(),'level':$("#iLangLvl").val(),'positivesToNextLevel':'15','purpose':'practice'}];
                            languages = JSON.stringify(languages);

                            var context = $(this);

                            $.ajax({
                                url: '/php/register.php',
                                type: 'POST',
                                dataType: "json",
                                data: {
                                    'userName': $("#userReg").val(), 
                                    'email': $("#emailReg").val(), 
                                    'password': $("#passwordReg").val(), 
                                    'realName': $("#nReal").val(), 
                                    'realLastName': $("#aReal").val(), 
                                    'languages': languages
                                }
                            }).done(function(data) {
                                // empty_parameter no lo compruebo por la comprobación previa al ajax
                                if(data.response === "invalid_email")
                                {
                                    alert("Invalid email.");
                                    $("#userReg").val("");
                                    $("#emailReg").val("");
                                    $("#passwordReg").val("");
                                    $("#passwordReg2").val("");
                                    $("#nReal").val("");
                                    $("#aReal").val("");
                                    $("#mLang").val("");
                                    $("#oLang").val("");
                                    $("#oLangLvl").val("");
                                    $("#iLang").val("");
                                    $("#iLangLvl").val("");
                                }
                                else
                                {
                                    if(data.response === "error_sending_email")
                                    {
                                        alert("Error sending email.");
                                        $("#userReg").val("");
                                        $("#emailReg").val("");
                                        $("#passwordReg").val("");
                                        $("#passwordReg2").val("");
                                        $("#nReal").val("");
                                        $("#aReal").val("");
                                        $("#mLang").val("");
                                        $("#oLang").val("");
                                        $("#oLangLvl").val("");
                                        $("#iLang").val("");
                                        $("#iLangLvl").val("");
                                    }
                                    else
                                    {
                                        if(data.response === "error_user_email_exists")
                                        {
                                            alert("Email already exists in database.");
                                            $("#userReg").val("");
                                            $("#emailReg").val("");
                                            $("#passwordReg").val("");
                                            $("#passwordReg2").val("");
                                            $("#nReal").val("");
                                            $("#aReal").val("");
                                            $("#mLang").val("");
                                            $("#oLang").val("");
                                            $("#oLangLvl").val("");
                                            $("#iLang").val("");
                                            $("#iLangLvl").val("");
                                        }
                                        else
                                        {
                                            if(data.response === "error_registering_user")
                                            {
                                                alert("Error registering user.");
                                                $("#userReg").val("");
                                                $("#emailReg").val("");
                                                $("#passwordReg").val("");
                                                $("#passwordReg2").val("");
                                                $("#nReal").val("");
                                                $("#aReal").val("");
                                                $("#mLang").val("");
                                                $("#oLang").val("");
                                                $("#oLangLvl").val("");
                                                $("#iLang").val("");
                                                $("#iLangLvl").val("");
                                            }
                                            else
                                            {
                                                alert("Register successful.");
                                                context.dialog("close");
                                            }
                                        }
                                    }
                                }
                            
                            }).fail(function(xhr, status, error) {
                                alert("Error: Register failed");
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
                        $("#aReal").val("");
                        $("#mLang").val("");
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