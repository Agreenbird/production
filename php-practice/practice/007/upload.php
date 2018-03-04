<?php
/*获取文件的临时地址*/
$tmp_name = @$_FILES['avatar']['tmp_name'];

if ($tmp_name) {
  /*移动临时文件*/
  move_uploaded_file($tmp_name, './image/' . rand(1000, 9999) . '.jpg');
} else {
  die('文件有误');
}
