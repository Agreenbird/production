<?php

class Product
{
  /*
   * 用于存放所有请求传参
   * */
  public $params;

  /*
   * 用于存放所有产品数据
   * */
  public $product_list;

  /*
   * 用于设置数据存放的文件路径
   * */
  public $file_path = './product.json';

  /*@2 实例化时自动触发*/
  public function __construct()
  {
    /* 将所有产品数据存入$product_list属性中 */
    $this->product_list = $this->read() ?: [];

    /* 将所有请求传参合并为一个数组，然后将其存入$params属性中 */
    $this->params = array_merge($_GET, $_POST);

    /*
     * 动态的触发方法
     * 比如说$action等于"remove"
     * 那么就会触发
     * $this->remove();
     * */
    $action = @$this->params['action'];
    $result = $this->$action();

    /* 向客户端返回对应的方法返回的数据 */
    echo $this->json($result);
  }

  /* @4
   * 添加*/
  public function add()
  {
    /*首选获取两个必填传参*/
    $title = $this->params['title'];
    $price = $this->params['price'];

    /*如果不存在，直接返回*/
    if ( ! $title || ! $price)
      return ['success' => false, 'msg' => 'invalid:title||price'];

    /*否则就将新数据推到产品列表中*/
    $this->product_list[] = [
      'title' => $title,
      'price' => $price,
    ];

    /*将数据存到文件里*/
    $this->sync();

    return ['success' => true];
  }

  /*@4*/
  public function remove()
  {
    /*首先确定要删除哪一条*/
    $index = $this->params['id'];

    /*删除产品列表中的数据*/
    unset($this->product_list[$index]);

    /*将数据存到文件里*/
    $this->sync();
    return ['success' => true];
  }

  /*@4*/
  public function update()
  {
    $params = $this->params;
    /*首先确定要更新哪一条*/
    $index = $params['id'];

    /*取到旧值*/
    $product = $this->product_list[$index];

    /*用新值合并旧值*/
    $this->product_list[$index] =
      array_merge($product,
        [
          'title' => $params['title'],
          'price' => $params['price'],
        ]);

    /*将数据存到文件里*/
    $this->sync();
    return ['success' => true];
  }

  /*@4*/
  public function read()
  {
    /*从文件取到json*/
    $json = file_get_contents($this->file_path);

    /*返回解码过的json，即数组*/
    return json_decode($json, true);
  }

  /*@4*/
  public function sync()
  {
    /*将$product_list转为json并存入文件*/
    file_put_contents($this->file_path, json_encode($this->product_list));
  }

  /* @5
   * 添加响应头，并转换为JSON
   * @param array $data 被转换的数据
   * */
  public function json($data)
  {
    header('Content-Type: application/json');
    return json_encode($data);
  }
}

/*@1 启动*/
$product = new Product();
