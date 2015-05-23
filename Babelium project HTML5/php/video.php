<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$id = $_POST['id'];

$params = array();

//$params['exerciseId'] = $id;
//$response = $g->serviceCall('http','getExerciseById', $params);
//print_r($response);
$params['exerciseId'] = $id;
$g->serviceCall('http','getExerciseById', $params);

 //$g->serviceCall('http','getRecordableExercises');

