<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$id = $_POST['id'];
$params = array();

$params['subtitle'] = $id;
$g->serviceCall('http','getSubtitleLines', $params);

 //$g->serviceCall('http','getRecordableExercises');

