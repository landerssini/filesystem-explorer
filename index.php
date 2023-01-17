<?php
// include 'dbh.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="style.css">
    <title>Files Explorer</title>
</head>

<body>
    <div id="header">
        <a href="index.php"><img src="assets/logo.png" alt="logo" id="logo"></a>
        <img src="assets/profilePic.png" class="rounded" alt="profilePic" id="profilePic">
    </div>
    <nav class="navbar navbar-light bg-light" id="upBar">

        <form class="d-flex" action='upload.php' method='POST' enctype='multipart/form-data'>
            <input class="form-control me-2" type="file" name="file">
            <button class="btn btn-outline-success mr-4" type="submit" name='submit'>Upload</button>
        </form>
        <form class="d-flex" action='search.php' method='GET'>
            <input class="form-control me-2" type="text" name='search' placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit" name='search'>Search</button>
        </form>
        <form class="d-flex" action='create.php' method='POST'>
            <input class="form-control me-2" type="text" name='name' placeholder="Folder name:">
            <button class="btn btn-outline-success" type="submit" name='create'>Create</button>
        </form>



    </nav>
    <div id="mainPage">
        <div id="directoryZone">
            <div id="directoryHome">
                <?php
                $path = 'uploads/';

                $files = array_values(array_diff(scandir($path), array('.', '..')));
                echo '<ul class="list-group">';
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
                    echo '<li class="list-group-item dirItem" value="' . $path . '" icon="' . $icono . '" file="' . $file . '" size="' . $fileSize . '" date="' . $fileDate . '">
                    <div class="dirItemBOX"><span class="material-symbols-outlined">' . $icono . '</span> 
                      <span><a href="' . $path . $file . '">' . $file . '</a></span></div>
                      <div class="dirItemBOX" ><span class="material-symbols-outlined deleteBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="' . $file . '" path="' . $path . '">delete</span>
                      <span class="material-symbols-outlined renameBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="' . $file . '" path="' . $path . '">edit</span></div>
                  </li>';
                };
                echo '</ul>';
                ?>
            </div>
            <div id="directory1">
            </div>
            <div id="directory2">

            </div>
            <div id="directory3">

            </div>
            <div id="directory4">

            </div>
        </div>
        <div id="itemInfo">
            <span class="material-symbols-outlined" id="iconInfo"></span>
            <h2 id="titleInfo"></h2>
            <h3>Size:</h3>
            <h4 id="sizeInfo"></h4>
            <h3>Path:</h3>
            <h4 id="pathInfo"></h4>
            <h3>Modify date:</h3>
            <h4 id="dateInfo"></h4>
            <h3>Actions:</h3>
            <div id="actionBtns"></div>
            el color este rancio se quita, es para ver que abarca el div :)

        </div>
    </div>
    <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <div id="action-btn"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>