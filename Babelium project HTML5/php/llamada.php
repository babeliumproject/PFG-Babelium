<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();
$id = $_POST['id'];

$params = array();

$params['id'] = 526;
$g->serviceCall('http','getExerciseById', $params);
// $params['exerciseId'] = '526';
// $g->serviceCall('http','getExerciseRoles', $params);

// $g->serviceCall('http','getRecordableExercises');

