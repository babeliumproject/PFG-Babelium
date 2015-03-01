window.onload = function()
{
	var currentUser; //Para almacenar un User de backbone con toda la información del JSON obtenido de SQL
	var bLogin = document.getElementById("botonaceptar");
	var bRegis = document.getElementById("botonRegistrar");


//CONSIDERAR CREAR UNA FUNCION INITIALIZE PARA ESTE TIPO DE COSAS
	var currentUserNav = new UserNavOff();
	$("#userNav").html(currentUserNav.el);



	bLogin.onclick = function(){
		var user = document.getElementById("user").value;
		var pass = document.getElementById("password").value;

		if(user == "jon" && pass == "lachen")
		{
			currentUser = new User();
			currentUser.set({userName: "Jon", email: "asdf@gmail.com", realName: "Jon", realLastname: "Lachén", motherLang: "Spanish", otherLang: "English", oLLevel: "A1", interestIn: "German", iILevel: "B1"});
			userNavSwitch();
			//ocultar("useroff");
			//mostrar("useron");
			//document.getElementById("username").innerHTML=user;
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
	}

	function userNavSwitch()
	{
		currentUserNav.unbind();
		if(currentUserNav instanceof UserNavOff)
		{
			currentUserNav = new UserNavOn(currentUser);
			$("#userNav").html(currentUserNav.el);
		}
		else
		{
			currentUserNav = new UserNavOff();
			$("#userNav").html(currentUserNav.el);
		}
	}

	function mostrar(id)
	{
		var el = document.getElementById(id);
		el.style.display = "block";
	}
	function ocultar(id)
	{
		var el = document.getElementById(id);
		el.style.display = "none";
	}

	function showUserInfo()
	{
		var userView = new UserView({model:currentUser});
		$("#mainBody").html(userView.el);
	}
}