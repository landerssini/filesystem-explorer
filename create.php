<?php
  $output_dir='uploads/';
  $folder_name=$_POST['name'];
  

  if (!file_exists($output_dir . $folder_name))/* Check folder exists or not */
  {
  @mkdir($output_dir . $folder_name, 0777);/* Create folder by using mkdir function, 
   (controlling such issues as whether the directory is writable): */

  header('Location: index.php');
  };