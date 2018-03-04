<?php
// yo yo yo.
class Cat
{
  public $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function add($p)
  {
    $title = @$p['title'];
    if ( ! $title)
      return ['success' => false, 'msg' => 'invalid:title'];

    if ($this->title_exist($title))
      return ['success' => false, 'msg' => 'exist:title'];

    $s = $this->db
      ->prepare('insert into cat (title) values (:title)');

    $r = $s->execute([
      'title' => $title,
    ]);

    return $r ?
      ['success' => true] :
      ['success' => false, 'msg' => 'internal_error'];
  }

  public function remove($p)
  {
    $id = @$p['id'];

    if ( ! $id || ! $this->find($id))
      return ['success' => false, 'msg' => 'invalid:id'];

    $s = $this->db->prepare('delete from cat where id = :id');
    $r = $s->execute([
      'id' => $id,
    ]);

    return $r ?
      ['success' => true] :
      ['success' => false, 'msg' => 'internal_error'];
  }

  public function update($p)
  {
    $id = @$p['id'];
    $old = $this->find($id);
    $title = @$p['title'];
    if ( ! $id || ! $old)
      return ['success' => false, 'msg' => 'invalid:id'];

    if ($this->title_exist($title))
      return ['success' => false, 'msg' => 'exist:title'];

    $new_row = array_merge($old,
      [
        'title' => $title,
      ]);

    $new_row['id'] = $old['id'];

    $s = $this->db->prepare('update cat set title = :title where id = :id');
    $r = $s->execute($new_row);

    return $r ?
      ['success' => true] :
      ['success' => false, 'msg' => 'internal_error'];
  }

  public function read($p)
  {
    $id = @$p['id'];
    $page = @$p['page'] ?: 1;
    $limit = 2;
    $offset = $limit * ($page - 1);
    $db = $this->db;

    if ($id) {
      $s = $db->prepare('select * from cat where id = :id');
      $s->execute(['id' => $id]);
      $d = $s->fetch(PDO::FETCH_ASSOC);
    } else {
      $s = $db->prepare('select * from cat order by id desc limit :offset, :limit');
      $s->execute(['offset' => $offset, 'limit' => $limit]);
      $d = $s->fetchAll(PDO::FETCH_ASSOC);
    }

    return ['success' => true, 'data' => $d];
  }

  public function title_exist($title)
  {
    $s = $this->db
      ->prepare('select * from cat where title = :title');
    $s->execute([
      'title' => $title,
    ]);
    return (bool) $s->fetch(PDO::FETCH_ASSOC);
  }

  public function find($id)
  {
    $s = $this->db
      ->prepare('select * from cat where id = :id');
    $s->execute([
      'id' => $id,
    ]);
    return $s->fetch(PDO::FETCH_ASSOC);
  }
}

