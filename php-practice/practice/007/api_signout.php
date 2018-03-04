<?php
session_start();

unset($_SESSION['username']);

redirect('/');

function redirect($url)
{
  header('Location: ' . $url);
}
