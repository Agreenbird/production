<?php
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

if ($username == 'whh' && $password == 'yoyoyo') {
  $_SESSION['username'] = 'whh';
  echo '登录成功';
  //redirect('/');
} else {
  echo '用户名或密码有误';
}

function redirect($url)
{
  header('Location: ' . $url);
}
