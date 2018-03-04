<?php
require_once 'api/product.php';
$list = $product->read();
?>
<!doctype html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    img {
      max-width: 100%;
    }
  </style>
</head>
<body>
<form action="api/product.php"
      method="post"
      enctype="multipart/form-data">
  标题：
  <input type="hidden" name="action" value="add">
  <input type="text" name="title" value="手机"><br>
  <input type="text" name="price" value="100"><br>
  <input type="file" name="cover"><br>
  <button type="submit">提交</button>
</form>
<div class="product-list">
  <?php foreach ($list as $product) : ?>
    <div class="product-item">
      <div class="cover"><img src="/file/<?php echo @$product['cover_file_name'] ?>" alt=""></div>
      <div class="title"><?php echo @$product['title'] ?></div>
      <div class="price"><?php echo @$product['price'] ?></div>
      <a href="/api/product.php?action=remove&id=<?php echo @$product['id'] ?>">删除</a>
    </div>
    <hr>
  <?php endforeach; ?>
</div>
</body>
</html>
