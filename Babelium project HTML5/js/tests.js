var languages = [{'language':'es_ES','level':'7','positivesToNextLevel':'15','purpose':'evaluate'},
				 {'language':'en_GB','level':'4','positivesToNextLevel':'15','purpose':'evaluate'},
				 {'language':'','level':'0','positivesToNextLevel':'','purpose':''}];

var user = new User({username:'test',
					 email:'example@example.com',
					 firstname:'Te',
					 lastname:'St',
					 creditCount:'0',
					 userLanguages:languages,
					 joiningDate:'1-1-1',
					 isAdmin:'No'});

QUnit.test('Inicializacion de usuario', function(assert) {
	expect(13);
	assert.strictEqual(user.attributes.username, 'test','Nombre de usuario');
	assert.strictEqual(user.attributes.email, 'example@example.com','Email');
	assert.strictEqual(user.attributes.firstname, 'Te','Nombre');
	assert.strictEqual(user.attributes.lastname, 'St','Apellido');
	assert.strictEqual(user.attributes.creditCount, '0','Credits');
	assert.strictEqual(user.attributes.userLanguages[0].language,'flag_spain','Nombre de idioma adaptado');
	assert.strictEqual(user.attributes.userLanguages[0].level,'','Nivel lengua materna');
	assert.strictEqual(user.attributes.userLanguages[1].language,'flag_united_kingdom','Nombre de idioma adaptado 2');
	assert.strictEqual(user.attributes.userLanguages[1].level,'B2','Nivel adaptado');
	assert.strictEqual(user.attributes.userLanguages[2].language,'no_flag','Idioma sin nombre');
	assert.strictEqual(user.attributes.userLanguages[2].level,'None','Idioma sin nivel');
	assert.strictEqual(user.attributes.joiningDate, '1-1-1','Fecha de registro');
	assert.strictEqual(user.attributes.isAdmin, 'No','Is admin');
});

var video = new Video({id:'1234',
					   title:'Prueba',
					   description:'Pruebapruebaprueba',
					   language:'es_ES',
					   tags:'tag',
					   source:'Prueba.test',
					   name:'Test',
					   thumbnailUri:'Prueba/test',
					   addingDate:'1-1-1',
					   duration:'300',
					   userName:'Tester',
					   avgDifficulty:'3',
					   status:'Avaliable',
					   license:'asdf',
					   reference:'ref'});

var video2 = new Video({language:'',
						duration:'-300',
						avgDifficulty:0});

QUnit.test('Inicializacion de video', function(assert) {
	expect(18);
	assert.strictEqual(video.attributes.id, '1234','Id');
	assert.strictEqual(video.attributes.title, 'Prueba','Titulo');
	assert.strictEqual(video.attributes.description, 'Pruebapruebaprueba','Descripcion');
	assert.strictEqual(video.attributes.language, 'flag_spain','Idioma');
	assert.strictEqual(video2.attributes.language, 'no_flag','Sin idioma');
	assert.strictEqual(video.attributes.tags, 'tag','Tags');
	assert.strictEqual(video.attributes.source, 'Prueba.test','Source');
	assert.strictEqual(video.attributes.name, 'Test','Nombre');
	assert.strictEqual(video.attributes.thumbnailUri, 'Prueba/test','ThumbnailUri');
	assert.strictEqual(video.attributes.addingDate, '1-1-1','Fecha de registro');
	assert.strictEqual(video.attributes.duration, '05:00','Duracion');
	assert.strictEqual(video2.attributes.duration, '00:00','Duracion negativa');
	assert.strictEqual(video.attributes.userName, 'Tester','Nombre de usuario');
	assert.strictEqual(video.attributes.avgDifficulty, 'B1','Dificultad');
	assert.strictEqual(video2.attributes.avgDifficulty, 'None','Dificultad fuera de rango');
	assert.strictEqual(video.attributes.status, 'Avaliable','Disponible');
	assert.strictEqual(video.attributes.license, 'asdf','Licencia');
	assert.strictEqual(video.attributes.reference, 'ref','Referencia');
});

