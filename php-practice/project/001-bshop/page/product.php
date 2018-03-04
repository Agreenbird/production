<!doctype html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>产品管理</title>
  <style>
    label {
      display: block;
    }
  </style>
</head>
<body>
<form id="product-form">
  <input type="hidden" name="id">
  <label>
    标题：<br>
    <input type="text" name="title">
  </label>
  <label>
    价格：<br>
    <input type="text" name="price">
  </label>
  <label>
    存货：<br>
    <input type="text" name="stock">
  </label>
  <label>
    分类：<br>
    <select name="cat_id" id="cat-selector">
    </select>
  </label><br>
  <button type="submit">提交</button>
</form>

<div id="product-list"></div>
<div id="product-list"></div>
<script src="/public/js/jquery.js"></script>
<script src="/public/js/base.js"></script>
</body>
</html>
