<?php

class A
{
  public $v = 1;
}

function change($obj)
{
  $obj->v = 2;
}

function makezero($obj)
{
  $obj = 0;
}

$a = new A();

change($a);

var_dump($a);

/*
output:

object(A)#1 (1) {
  ["v"]=>
  int(2)
}

*/

makezero($a);

var_dump($a);

/*
output (same as before):

object(A)#1 (1) {
  ["v"]=>
  int(2)
}

*/
