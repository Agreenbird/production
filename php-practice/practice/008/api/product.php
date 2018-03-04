<?php

class Product
{
  public $list;
  public $last_id;
  public $list_src;
  public $last_id_src = '/Users/kev/biaoyansu/f2f_code/php/practice/008/data/last_id.json';

  public function __construct()
  {
    $this->list_src = dirname(__FILE__) . '/../data/product.json';

    $this->read();

    $param = array_merge($_GET, $_POST);

    $action = @$param['action'];
    if ($action)
      $this->$action();
  }

  public function add()
  {
    $title = @$_POST['title'];
    $price = @$_POST['price'];
    $cover = @$_FILES['cover']['tmp_name'];
    $cover_file_name = time() . rand(100, 999) . '.jpg';
    move_uploaded_file($cover, '/Users/kev/biaoyansu/f2f_code/php/practice/008/file/' . $cover_file_name);

    if ( ! $title || ! $price || ! $cover)
      return ['success' => false, 'msg' => 'invalid:title||price||cover'];

    $this->list[] = [
      'id'              => $this->inc(),
      'title'           => $title,
      'price'           => $price,
      'cover_file_name' => $cover_file_name,
    ];

    $this->sync();

    return ['success' => true];
  }

  public function remove()
  {
    var_dump(1);
    $id = $_GET['id'];
    $index = $this->find_index($id);
    array_splice($this->list, $index, 1);
    $this->sync();
    var_dump($this->read());
  }

  public function find_index($id)
  {
    foreach ($this->list as $index => $product) {
      if ($id == @$product['id']) {
        return $index;
      }
    }
  }

  public function update()
  {
  }

  public function read()
  {
    $json = file_get_contents($this->list_src);
    $this->list = json_decode($json, true);
    $this->last_id = json_decode(file_get_contents($this->last_id_src));
    return $this->list;
  }

  public function sync()
  {
    $json = json_encode($this->list);
    file_put_contents($this->list_src, $json);
  }

  public function inc()
  {
    $this->last_id++;
    file_put_contents($this->last_id_src, json_encode($this->last_id));
    return $this->last_id;
  }
}

$product = new Product();
//var_dump($product->add());
