window.onload = function()
{
	var bLogin = document.getElementById("botonaceptar");
	var bRegis = document.getElementById("botonRegistrar");

	var prueba = new User();
	var userNav = new UserNav({model:prueba});
	$("#useroff").html(userNav.el);

	bLogin.onclick = function(){
		var user = document.getElementById("user").value;
		var pass = document.getElementById("password").value;

		if(user == "jon" && pass == "lachen")
		{
			ocultar("useroff");
			mostrar("useron");
			document.getElementById("username").innerHTML=user;
			ocultar("modalLogin");

			//Falta tema de recordar, habría que usar localstorage. También recuperar pass falta.
		}
		else
		{
			alert("Wrong username or password. Please try again");
		}
		
		document.getElementById("login").reset();
	};

	bRegis.onclick = function(){
		var member = new User();
		member.set({userName: document.getElementById("userReg").value, email: document.getElementById("emailReg").value, password: document.getElementById("passwordReg").value,	realName: document.getElementById("nReal").value, realLastname: document.getElementById("aReal").value, motherLang: document.getElementById("mLang").value, otherLang: document.getElementById("oLang").value, oLLevel: document.getElementById("oLangLvl").value, interestIn: document.getElementById("iLang").value, iILevel: document.getElementById("iLangLvl").value});
		document.getElementById("register").reset();
		var userView = new UserView({model:member});
		$("#userinfo").html(userView.el);
	}

	function mostrar(id)
	{
		var el = document.getElementById(id);
		el.style.visibility = "visible";
	}
	function ocultar(id)
	{
		var el = document.getElementById(id);
		el.style.visibility = "hidden";
	}

}