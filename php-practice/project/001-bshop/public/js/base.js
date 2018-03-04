;(function () {
  'use strict';

  var cat_list = [];
  var product_list = [];

  var el_cat_selector = document.querySelector('#cat-selector');
  var el_product_list = document.querySelector('#product-list');
  var el_product_form = document.querySelector('#product-form');

  init();

  function init() {
    get_cat_list();
    get_product_list();

    el_product_form.addEventListener('submit', function (e) {
      e.preventDefault();
      var row = get_form_data(el_product_form);
      add_or_update(row);
    })
  }

  function get_form_data(el) {
    var input_list = el.querySelectorAll('[name]');
    var row = {};
    for (var i = 0; i < input_list.length; i++) {
      var item = input_list[i];
      var key = item.name;
      var value = item.value;
      row[key] = value;
    }
    return row;
  }

  function set_form_data(el, row) {
    // var input_list = el.querySelectorAll('[name]');
    // input_list.forEach(function (input) {
    //   var name = input.name;
    //   input.value = row[name];
    // })
    for (var key in row) {
      var input = el.querySelector(`[name=${key}]`);
      if (input)
        input.value = row[key];
    }
  }

  function add_or_update(row) {
    if (row.id) {
      var promise = $.post('/api/gateway.php?model=product&action=update', row)
    } else {
      var promise = $.post('/api/gateway.php?model=product&action=add', row)
    }

    promise
      .then(function (res) {
        if (res.success) {
          get_product_list();
          clear_form(el_product_form);
        }
      })
  }

  function clear_form(el) {
    el
      .querySelectorAll('[name]')
      .forEach(function (input) {
        input.value = '';
      });
  }

  /*获取分类列表*/
  function get_cat_list() {
    $.get('/api/gateway.php?model=cat&action=read')
      .then(function (res) {
        cat_list = res.data;
        render_cat_selector();
      });
  }

  function get_product_list() {
    $.get('/api/gateway.php?model=product&action=read')
      .then(function (res) {
        product_list = res.data;
        render_product_list();
      });
  }

  function remove_product(id) {
    var ok = confirm('确定要删除吗？');
    if (!ok)
      return;

    $.post('/api/gateway.php?model=product&action=remove', {id: id})
      .then(function (res) {
        if (res.success) {
          get_product_list();
          render_product_list();
        }
      });
  }

  function render_cat_selector() {
    el_cat_selector.innerHTML = '';
    for (var i = 0; i < cat_list.length; i++) {
      var item = cat_list[i];
      var el = document.createElement('option');
      el.value = item.id;
      el.innerText = item.title;
      el_cat_selector.appendChild(el);
    }
  }

  function render_product_list() {
    el_product_list.innerHTML = '';
    product_list.forEach(function (row) {
      var el = document.createElement('div');
      el.innerHTML = `
      <strong>${row.title}</strong>
      <span>${row.price}</span>
      <button class="update">更新</button>
      <button class="delete">删除</button>
      <hr>
      `;

      var update_btn = el.querySelector('.update');
      var delete_btn = el.querySelector('.delete');

      update_btn.addEventListener('click', function () {
        set_form_data(el_product_form, row);
      });

      delete_btn.addEventListener('click', function () {
        remove_product(row.id);
      })

      el_product_list.appendChild(el);
    })
  }
})();
