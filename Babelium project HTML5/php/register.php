<?php

require_once("babelium_gateway.php");
$CFG = new Config();
$g = new babelium_gateway();

$user = $_POST['userName'];
$email = $_POST['email'];
$password = $_POST['password'];
$realName = $_POST['realName'];
$realLastName = $_POST['realLastname'];
$languages = $_POST['languages'];