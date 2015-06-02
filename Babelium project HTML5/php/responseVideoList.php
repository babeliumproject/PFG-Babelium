<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$response = $g->serviceCall('http','getResponseVideos');
print_r($response);