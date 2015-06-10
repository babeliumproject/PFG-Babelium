<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$session = $g->serviceCall('http','getSessionData');

print_r($session);