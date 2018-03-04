<?php

class Product
{
  public $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function add($row)
  {
    $title = @$row['title'];
    $price = @$row['price'];
    $cat_id = @$row['cat_id'];
    $stock = @$row['stock'] ?: 0;

    if ( ! $title || ! $price || ! $cat_id) {
      return ['success' => false, 'msg' => 'invalid:title||price||cat_id'];
    }

    if ( ! is_numeric($price) || ! is_numeric($cat_id) || ! is_numeric($stock))
      return ['success' => false, 'msg' => 'invalid:price||cat_id||stock'];

    $db = $this->db;

    $sql = $db->prepare("
        insert into product 
        (title, price, cat_id, stock) 
        value ('{$title}','{$price}', '{$cat_id}', '{$stock}')");
    $r = $sql->execute();
    return $r ?
      ['success' => true] :
      ['success' => false, 'msg' => 'db_internal_error'];
  }

  public function remove($row)
  {
    $id = @$row['id'];
    if ( ! is_numeric($id))
      return ['success' => false, 'msg' => 'invalid:id'];

    $r = $this
      ->db
      ->prepare('delete from product where id = :id')
      ->execute(['id' => $id]);

    return $r ?
      ['success' => true] :
      ['success' => false, 'msg' => 'db_internal_error'];
  }

  public function update($row)
  {
    $id = @$row['id'];
    if ( ! is_numeric($id))
      return ['success' => false, 'msg' => 'invalid:id1'];

    /*找到已存在的商品*/
    $statement = $this->db->prepare('select * from product where id = :id');
    $statement->execute(['id' => $id]);
    $old = $statement->fetch(PDO::FETCH_ASSOC);

    if ( ! $old) {
      return ['success' => false, 'msg' => 'invalid:id2'];
    }

    /*合并老数据*/
    $merged = array_merge($old, $row);
    //dd($merged);
    $r = $this->db->prepare('update product set title=:title, price=:price, cover_src=:cover_src, stock=:stock, des=:des, cat_id=:cat_id, data=:data where id = :id')
      ->execute($merged);

    return $r ?
      ['success' => true] :
      ['success' => false, 'msg' => 'db_internal_error'];
  }

  public function read()
  {
    $page = (int) @$_GET['page'] ?: 1;
    $limit = 10;
    $offset = $limit * ($page - 1);
    $s = $this->db->prepare('select * from product order by id desc limit :offset, :limit');
    $s->execute([
      'offset' => $offset,
      'limit'  => $limit,
    ]);
    return ['success' => true, 'data' => $s->fetchAll(PDO::FETCH_ASSOC)];
  }
}
