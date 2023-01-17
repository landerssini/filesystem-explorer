<?php

$directory = $_GET['directory'];
$files = scandir($directory);
$filesInfo = array();
foreach ($files as $file) {

    $extension = pathinfo($file, PATHINFO_EXTENSION);
    $fileSize = filesize($path . $file);
    $fileDate = date('Y-m-d H:i:s', filemtime($path . $file));
    switch ($extension) {
        case "txt":
            $icono = "notes";
            break;
        case "doc":
        case "docx":
            $icono = "description";
            break;
        case "pdf":
            $icono = "picture_as_pdf";
            break;
        case "csv":
            $icono = "border_all";
            break;
        case "jpg":
        case "png":
            $icono = "image";
            break;
        case "ppt":
            $icono = "co_present";
            break;
        case "odt":
            $icono = "description";
            break;
        case "zip":
        case "rar":
            $icono = "folder_zip";
            break;
        case "exe":
            $icono = "terminal";
            break;
        case "svg":
            $icono = "polyline";
            break;
        case "mp3":
            $icono = "graphic_eq";
            break;
        case "mp4":
            $icono = "smart_display";
            break;
        case "":
            $icono = "folder";
            break;
        default:
            $icono = "draft";
    };
    $fileInfo = array(
        'file' => $file,
        'extension' => $extension,
        'fileSize' => $fileSize,
        'fileDate' => $fileDate,
        'icono' => $icono
    );
    array_push($filesInfo, $fileInfo);
}
echo json_encode($filesInfo);
?>



