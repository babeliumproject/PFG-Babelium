window.onload = function()
{
	$.ajax({
            url: '/php/getSessionData.php',
            type: 'POST'
        }).done(function(data) {
            var d = JSON.parse(data);

            // Comprobación de si esta logueado o no
            if(d.response && d.response.username)
            {
            	var currentUser = new User(d.response);
                var userView = new UserNavOn({model: currentUser});
            }
            else
            {   
    			window.location.href = '#Home';
				var currentUserNav = new UserNavOff();
            }
        }).fail(function(xhr, status, error) {
            alert("Error: Failed to check the user");
        });
}