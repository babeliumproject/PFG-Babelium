<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$session = $g->serviceCall('http','endSession');

print_r($session);