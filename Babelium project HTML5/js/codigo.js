window.onload = function()
{
	//PRUEBAS CON VIDEOS
	var videos = new VideoList();
	videos.fetch();
	





	var currentUser; //Para almacenar un User de backbone con toda la información del JSON obtenido de SQL
	var bLogin = document.getElementById("botonaceptar");
	var bRegis = document.getElementById("botonRegistrar");
	var bpract = document.getElementById("practice");


//CONSIDERAR CREAR UNA FUNCION INITIALIZE PARA ESTE TIPO DE COSAS
	var currentUserNav = new UserNavOff();


	//BOTON DE ACEPTAR LOGIN
	bLogin.onclick = function(){
		var user = document.getElementById("user").value;
		var pass = document.getElementById("password").value;

		if(user == "jon" && pass == "lachen")
		{var videoview = new VideoListView({collection:videos});
			currentUser = new User();
			currentUser.set({userName: "Jon", email: "asdf@gmail.com", realName: "Jon", realLastname: "Lachén", motherLang: "Spanish", otherLang: "English", oLLevel: "A1", interestIn: "German", iILevel: "B1"});
			userNavSwitch();
			ocultar("modalLogin");

			//Falta tema de recordar, habría que usar localstorage. También recuperar pass falta.
		}
		else
		{
			alert("Wrong username or password. Please try again");
		}
		
		document.getElementById("login").reset();
	};

	/*bpract.onclick = function() {
		var videosView = new VideoListView({collection:videos});
		$(document.body).append(videosView.render().el);
	}*/
	function practiceShow() {
		var videosView = new VideoListView({collection:videos});
		$(document.body).append(videosView.render().el);
	}

	//BOTON DE ACEPTAR REGISTRO
	bRegis.onclick = function(){
		var member = new User();
		member.set({userName: document.getElementById("userReg").value, email: document.getElementById("emailReg").value, password: document.getElementById("passwordReg").value,	realName: document.getElementById("nReal").value, realLastname: document.getElementById("aReal").value, motherLang: document.getElementById("mLang").value, otherLang: document.getElementById("oLang").value, oLLevel: document.getElementById("oLangLvl").value, interestIn: document.getElementById("iLang").value, iILevel: document.getElementById("iLangLvl").value});
		document.getElementById("register").reset();
	}


	//CAMBIO DE NAVEGADOR DE USUARIO EN FUNCION DE SI ESTAS LOGUEADO O NO
	function userNavSwitch()
	{
		if(currentUserNav instanceof UserNavOff)
		{
			currentUserNav = new UserNavOn({model:currentUser});
		}
		else
		{
			currentUserNav = new UserNavOff();
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
	}


}