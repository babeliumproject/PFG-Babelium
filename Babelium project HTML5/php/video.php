<?php
// juanan
require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$id = $_POST['id'];
$params = array();

$params['id'] = $id;
$g->serviceCall('http','getExerciseById', $params);

 //$g->serviceCall('http','getRecordableExercises');

