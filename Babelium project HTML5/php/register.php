<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();


$user = $_POST['userName'];
$email = $_POST['email'];
$password = $_POST['password'];
$realName = $_POST['realName'];
$realLastName = $_POST['realLastName'];
$languages = $_POST['languages'];

$params = array();

$params['username'] = $user;
$params['email'] = $email;
$params['password'] = $password;
$params['firstname'] = $realName;
$params['lastname'] = $realLastName;
$params['languages'] = $languages;

$g->serviceCall('http','register', $params);

