<?php

class Person
{
  public $age = 20;
  protected $a = 1;
  private $name = '王花花';


  public function walk()
  {
    echo $this->name;
  }

  function run()
  {
    $this->name;
    $this->yo();
  }
}

class Man extends Person
{
  function smoke()
  {
  }
}

$p = new Person;
//var_dump($p->walk());

$m = new Man;
$m->smoke();
