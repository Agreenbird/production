## 是什么
**属性**一个物件的自身的特点或特性。

一个物件有多少属性？

比如说一个人，你就想尽他的一切特性，比如他的姓名，年龄，身高，爱好... 直到你想不出来。然后你会发现“腿毛数”好像也是个属性，那“长于2厘米的腿毛数”也是个属性。

答案是无穷多。

无穷多叫我怎么定义？

你只需定义你需要的属性。

比如说我们在做一个商品模块，我们需要定义一个商品的类

```php
class Product {

}
```
想想看我们需要的属性有多少呢？首先一个商品要有标题，不然不知道是什么东西。然后肯定要有价格，不然不叫商品
```php
class Product {
  /* 先不管public的意思，后面会说到 */
  public $title; // 标题
  public $price; // 价格
}
```
商品要有详情页，然而没有地方存详细信息
```php
class Product {
  public $title; 
  public $price;
  public $description; // 描述
}
```
“商品”这类物件就这样一步步被高度概括出来了，机器并不知道这个类有什么意义，但我们知道这个类代表商品。
