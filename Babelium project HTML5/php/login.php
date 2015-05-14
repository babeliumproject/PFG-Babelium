<?php

$user = $_POST['user'];
$pass = $_POST['pass'];

if($user === 'jon' && $pass === 'lachen')
{
	$status = "ok";
	echo $status;
}
else
{
	$status = "not ok";
	echo $status;
}