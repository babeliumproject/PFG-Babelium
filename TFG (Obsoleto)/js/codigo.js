window.onload = function()
{
	var divActivo = "principal";

	var blogin = document.getElementById("botonaceptar");

	blogin.onclick = function(){
		var user = document.getElementById("user").value;
		var pass = document.getElementById("password").value;

		if(user == "jon" && pass == "lachen")
		{
			ocultar("useroff");
			mostrar("useron");
			document.getElementById("username").value=user;
		}
	};

	var buser = document.getElementById("username");

	buser.onclick = function(){
		ocultar(divActivo);
		mostrar("userdata");
		divActivo = "userdata";
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