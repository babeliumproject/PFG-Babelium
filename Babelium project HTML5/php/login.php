<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$user = $_POST['user'];
$pass = $_POST['pass'];

$params['username'] = $user;
$params['password'] = sha1($pass);
$login = $g->serviceCall('http','processLogin', $params);

print_r($login);