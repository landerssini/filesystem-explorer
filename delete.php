<?php
// check if file_path is set
$check = $_POST['file_path'];

if (!is_dir($check)) {
    if (isset($_POST['file_path'])) {
        $file_path = $_POST['file_path'];
        // check if file exists
        if (file_exists($file_path)) {
            // delete file
            if (unlink($file_path)) {
                echo 'File was deleted';
                header('Location: index.php');
            } else {
                echo 'Error deleting file';
            }
        } else {
            echo 'File not found';
        }
    } else {
        echo 'file_path is not set';
    }
} else {
    rmdir($check);
    header('Location: index.php');
}


