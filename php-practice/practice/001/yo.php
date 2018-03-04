<?php
$user_list = [
  [
    'name' => 'whh',
    'age'  => 18,
  ],
  [
    'name' => 'lsd',
    'age'  => 20,
  ],
  [
    'name' => 'muhaha',
    'age'  => 30,
  ],
];

$whh = [
  'name' => 'whh',
  'age'  => 20,
];

?>
<h1>用户列表</h1>
<?php foreach ($user_list as $user): ?>
  <div><?php echo $user['name'] ?></div>
  <div>yo</div>
  <div>yo2</div>
  <hr>
<?php endforeach; ?>

<?php foreach ($whh as $key => $value): ?>
  <div><?php echo $key ?> : <?php echo $value ?></div>
<?php endforeach; ?>
<script>
</script>

