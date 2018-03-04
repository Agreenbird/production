<?php
session_start();

echo @$_SESSION['username'] . '你好';
