<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$name = $_POST['name'];
$params = array();

$params['name'] = $name;
$g->serviceCall('http','getExerciseByName', $params);

 //$g->serviceCall('http','getRecordableExercises');

