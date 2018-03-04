;(function () {
  'use strict';

  var product_list = [];
  var el_form = document.querySelector('#form-product');
  var el_list = document.querySelector('#list-product');
  var el_title = el_form.querySelector('[name="title"]');
  var el_price = el_form.querySelector('[name="price"]');

  init();

  function init() {
    get_all();

    el_form.addEventListener('submit', function (e) {
      e.preventDefault();
      var product = {};
      product.title = el_title.value;
      product.price = parseFloat(el_price.value);
      if (!product.title || !product.price)
        return;

      $.post('/product_add.php', product)
        .done(function (r) {
          get_all();
        });
    });
  }

  function get_all() {
    $.get('/product_read.php')
      .done(function (r) {
        product_list = r;
        render();
      });
  }

  function render() {
    el_list.innerHTML = '';
    product_list.forEach(function (product) {
      var div = document.createElement('div');
      div.innerHTML = `
      <div>
      <b>${product.title}</b>
      <span>${product.price}</span>
      </div>
      `;

      el_list.appendChild(div);
    })
  }
})();
