<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$id = $_POST['id'];
$params = array();

$params['exerciseId'] = $id;
$g->serviceCall('http','getExerciseLocales', $params);

 //$g->serviceCall('http','getRecordableExercises');

