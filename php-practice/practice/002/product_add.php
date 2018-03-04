<?php
$product_list = [];

init();

function add()
{
  global $product_list;

  $title = $_POST['title'];
  $price = $_POST['price'];
  if ( ! $_POST['title'] || ! $_POST['price']) {
    die('invalid:title||invalid:price');
  }

  $product_list[] = [
    'title' => $title,
    'price' => $price,
  ];

  sync();

}

function init()
{
  global $product_list;
  $product_list = get_all();
  add();
}

function sync()
{
  global $product_list;

  file_put_contents('./data.json', json_encode($product_list));
}

function get_all()
{
  return json_decode(file_get_contents('./data.json'));
}
