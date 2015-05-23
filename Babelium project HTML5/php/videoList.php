<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$response = $g->serviceCall('http','getRecordableExercises');
print_r($response);