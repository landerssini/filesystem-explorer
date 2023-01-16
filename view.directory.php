<?php

$path = 'uploads/'.$_GET['dir'].'/';
$files = array_values(array_diff(scandir($path), array('.', '..')));
foreach ($files as $file) {
    echo $file.'<br>';
}