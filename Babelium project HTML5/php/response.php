<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$name = $_POST['name'];

$params = array();

$params['responseName'] = $name;

$g->serviceCall('http','admGetResponseByName', $params);