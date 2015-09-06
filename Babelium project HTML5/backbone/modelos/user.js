var User = Backbone.Model.extend({
    initialize: function () {
        var dif,x;

        for(x = 0; x < this.get('userLanguages').length ;x++)
        {
            dif = this.get('userLanguages');
            // Preparo el idioma para poder cargar la bandera
            switch (dif[x].language)
            {
                case 'eu_ES':
                    dif[x].language = 'flag_basque_country';
                    break;
                case 'de_DE':
                    dif[x].language = 'flag_germany';
                    break;
                case 'fr_FR':
                    dif[x].language = 'flag_france';
                    break;
                case 'en_GB':
                    dif[x].language = 'flag_united_kingdom';
                    break;
                case 'en_US':
                    dif[x].language = 'flag_united_states';
                    break;
                case 'es_ES':
                    dif[x].language = 'flag_spain';
                    break;
            }
        }

        for(x = 0; x < this.get('userLanguages').length ;x++)
        {
            // Preparo la dificultad
            switch (dif[x].level)
            {
                case '1':
                    dif[x].level = 'A1';
                    break;
                case '2':
                    dif[x].level = 'A2';
                    break;
                case '3':
                    dif[x].level = 'B1';
                    break;
                case '4':
                    dif[x].level = 'B2';
                    break;
                case '5':
                    dif[x].level = 'C1';
                    break;
                case '7':
                    dif[x].level = '';
                    break;
            }
        }
    },
    defaults: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        creditCount: "",
        userLanguages: [],
        joiningDate: "",
        isAdmin: ""
    }
});