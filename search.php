<?php

// include 'dbh.php';

if(isset($_GET['submit'])){
    
    // Retrieve the search query from the form
    $searchQuery = $_GET['search'];
    // Create an array to store matching files
    print_r($searchQuery) ;

    echo 'dentro del if';

    $matchingFiles = array();
    // Search through the files in the uploads directory
    $dir = 'uploads';
    $files = scandir($dir);
    foreach($files as $file) {
        if(strpos($file, $searchQuery) !== false) {
            // If the file name contains the search query, add it to the array of matching files
            $matchingFiles[] = $file;
        }
    }
    // Display the matching files
    echo '<ul>';
    foreach($matchingFiles as $matchingFile) {
        echo '<li>'.$matchingFile.'</li>';
    }
    echo '</ul>';
}
?>
