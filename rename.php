<?php




if (isset($_POST['rename'])) {
    $file = $_POST['value'];
    $rename = $_POST['rename'];
    $path = 'uploads/';
    $extension = pathinfo($file, PATHINFO_EXTENSION);
    $new_file = $path.$rename.'.'.$extension;
    if (rename($file, $new_file)) {
        header('Location: index.php');
    } else {
        echo 'There was an error renaming the file. <br>';
        echo "Old file: " . $file . "<br>";
        echo "New file: " . $new_file . "<br>";
        echo "Error: " . error_get_last()['message'];

    }
}
