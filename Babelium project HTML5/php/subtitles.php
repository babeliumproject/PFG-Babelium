<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$id = $_POST['id'];
$lang = $_POST['lang'];

$params = array();

$params['exerciseId'] = $id;
$params['language'] = $lang;
$g->serviceCall('http','getSubtitleLines', $params);

 //$g->serviceCall('http','getRecordableExercises');

