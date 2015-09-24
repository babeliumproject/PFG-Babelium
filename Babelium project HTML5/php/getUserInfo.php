<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$username = $_POST["username"];

$params = array();

$params[''] = $;

$g->serviceCall('http','saveResponse', $params);*/