var Video = Backbone.Model.extend({
    initialize: function () {
        console.log("Video created");

        // Preparo la duracion del video en formato min:sec
        var minutes = Math.floor(this.get('duration') / 60);
        var seconds = this.get('duration') % 60;

        //Anteponiendo un 0 a los minutos si son menos de 10 
        minutes = minutes < 10 ? '0' + minutes : minutes;

        //Anteponiendo un 0 a los segundos si son menos de 10 
        seconds = seconds < 10 ? '0' + seconds : seconds;

        this.set('duration', minutes + ":" + seconds);  // 161:30

        // Preparo el idioma para poder cargar la bandera
        switch (this.get('language'))
        {
            case 'de_DE':
                this.set('language', 'flag_germany');
                break;
            case 'fr_FR':
                this.set('language', 'flag_france');
                break;
            case 'en_GB':
                this.set('language', 'flag_united_kingdom');
                break;
            case 'en_US':
                this.set('language', 'flag_united_states');
                break;
            case 'es_ES':
                this.set('language', 'flag_spain');
                break;
        }

        // Preparo la dificultad

        var dif = parseInt(this.get('avgDifficulty'));
        switch (dif)
        {
            case 1:
                this.set('avgDifficulty', 'A1');
                break;
            case 2:
                this.set('avgDifficulty', 'A2');
                break;
            case 3:
                this.set('avgDifficulty', 'B1');
                break;
            case 4:
                this.set('avgDifficulty', 'B2');
                break;
            case 5:
                this.set('avgDifficulty', 'C1');
                break;
        }

        // Preparo la fecha del video
        this.set('addingDate', this.get('addingDate').split(' ')[0]);
    },
    defaults: {
        id: "",
        title: "",
        description: "",
        language: "",
        tags: "",
        source: "",
        name: "",
        thumbnailUri: "",
        addingDate: "",
        duration: "",
        userName: "",
        avgDifficulty: "",
        status: "",
        license: "",
        reference: ""
    }
});