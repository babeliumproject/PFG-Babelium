var UserNavOff = Backbone.View.extend({
    el: $("#userNav"),
    my_template: _.template(
            "<li><a href='#Help/page_1' class='img'><img src='themes/babelium/images/help_icon.png' alt='Help' width='17' height='17'/></a></li>"
            + "<li><a href='#Help/page_1' class='blue'>Help</a></li>"
            + "<li><a href='http://blog.babeliumproject.com/' class='blue'>Blog</a></li>"
            + "<li><a id='loginD' class='yellow'>Login</a></li>"
            + "<li><a id='regisD' class='yellow'>Register</a></li>"),
    events:
            {
                'click #loginD': 'goLogin',
                'click #regisD': 'goRegis'
            },
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.my_template());
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
                                console.log(data.response);
                                context.dialog("close");
                                var currentUser = new User();
                                currentUser.set({userName: data.response.username, email: data.response.email, realName: data.response.firstname, realLastname: data.response.lastname, credits: data.response.creditCount, motherLang: "Spanish", otherLang: "English", oLLevel: "A1", interestIn: "German", iILevel: "B1"});
                                new UserNavOn({model: currentUser});
                                sessionStorage.setItem('current_user', JSON.stringify(currentUser));
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
                        /*if (user === "jon" && pass === "lachen")
                        {
                            alert("Login successful");
                            $(this).dialog("close");
                            var currentUser = new User();
                            currentUser.set({userName: "Jon", email: "asdf@gmail.com", realName: "Jon", realLastname: "Lachén", motherLang: "Spanish", otherLang: "English", oLLevel: "A1", interestIn: "German", iILevel: "B1"});
                            new UserNavOn({model: currentUser});
                            sessionStorage.setItem('current_user', JSON.stringify(currentUser));
                        }
                        else
                        {
                            alert("User or password is not correct");
                            $('#user').val("");
                            $('#password').val("");
                        }*/
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
                    text: "Log in",
                    click: function ()
                    {
                        // Al hacer clic en log in guardo los valores
                        var member = new User();
                        member.set({userName: $("#userReg").val(), email: $("#emailReg").val(), password: $("#passwordReg").val(), realName: $("#nReal").val(), realLastname: $("aReal").val(), motherLang: $("mLang").val(), otherLang: $("#oLang").val(), oLLevel: $("#oLangLvl").val(), interestIn: $("#iLang").val(), iILevel: $("#iLangLvl").val()});
                        console.log(member);
                        // TODO GUARDAR EN EL SERVIDOR CON AJAX
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