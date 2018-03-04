<?php

class Product
{
  /*初始数据，便于测试*/
  public $product_list = [
    [
      'title' => 1,
    ],
    [
      'title' => 2,
    ],
  ];

  public function add()
  {
    /*获取传参生成新的产品*/
    $product = [
      'title' => $_GET['title'],
      'price' => $_GET['price'],
    ];

    /*推入产品列表*/
    $this->product_list[] = $product;

    var_dump($this->product_list);
  }

  public function remove()
  {
    /*获取要删除的产品id*/
    $index = $_GET['id'];

    /*删除产品*/
    unset($this->product_list[$index]);

    var_dump($this->product_list);
  }
}

$product = new Product();
$product->remove();
