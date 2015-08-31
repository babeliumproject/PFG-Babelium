<?php

require_once("babelium_gateway.php");
require_once("UserLanguageVO.php");

$CFG = new Config();
$g = new babelium_gateway();


$user = $_POST['userName'];
$email = $_POST['email'];
$password = $_POST['password'];
$realName = $_POST['realName'];
$realLastName = $_POST['realLastName'];
$languagesAux = json_decode($_POST['languages']);

$languages = array();
$params = array();

$params['username'] = $user;
$params['email'] = $email;
$params['password'] = $password;
$params['firstname'] = $realName;
$params['lastname'] = $realLastName;
$params['languages'] = array();

foreach ($languagesAux as $language) {
	$lang = new UserLanguageVO();
	$lang->id = 0;
	$lang->language = $language->language;
	$lang->level = $language->level;
	$lang->purpose = $language->purpose;
	array_push($params['languages'],$lang);
}


$g->serviceCall('http','register', $params);

