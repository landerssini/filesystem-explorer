var renameItems
var deleteItems
let filePath
let fileName
let fileSize
let fileIcon
let fileDate
let titleInfo = document.querySelector("#titleInfo")
let pathInfo = document.querySelector("#pathInfo")
let iconInfo = document.querySelector("#iconInfo")
let sizeInfo = document.querySelector("#sizeInfo")
let dateInfo = document.querySelector("#dateInfo")
let modalTitle = document.querySelector("#modal-title")
let modalBody = document.querySelector("#modal-body")
let actionBtn = document.querySelector("#action-btn")
let directory1 = document.querySelector("#directory1")
let directory2 = document.querySelector("#directory2")
let directory3 = document.querySelector("#directory3")
let directory4 = document.querySelector("#directory4")
let actionBtns = document.querySelector("#actionBtns")

function fillDirectory(icon, path, name) {
  if (icon == "") {
    directory1.innerHTML = `<?php
    $path = ${path}${name};;
  
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
        echo '<li class="list-group-item dirItem" value="' . $path . $file . '" icon="' . $icono . '" file="' . $file . '" size="' . $fileSize . '" date="' . $fileDate . '">
          <span class="material-symbols-outlined">' . $icono . '</span> 
          <span><a href="' . $path . $file . '">' . $file . '</a></span>
          <span class="material-symbols-outlined deleteBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="'.$file.'" path="'.$path.'">delete</span>
          <span class="material-symbols-outlined renameBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="'.$file.'" path="'.$path.'">edit</span>
      </li>';
    };
    echo '</ul>';
    ?>`
  }
}

function deleteFile(file_path) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.open("GET", "delete.php?file_path=" + file_path, true);
  xhttp.send();
}
function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return 'n/a';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + ' ' + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}
function checkDirFile(path, name, icon, size, date) {
  titleInfo.innerHTML = `${name}`
  iconInfo.innerHTML = `${icon}`
  sizeInfo.innerHTML = `${size}`
  dateInfo.innerHTML = `${date}`
  pathInfo.innerHTML = `${path}${name}`
  actionBtns.innerHTML = `<span class="material-symbols-outlined deleteBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${name}" path="${path}">delete</span>
  <span class="material-symbols-outlined renameBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${name}" path="${path}">edit</span>`
  assignRenameBtn()
  assignDeleteBtn()
}

var items = document.querySelectorAll(".dirItem");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    filePath = this.getAttribute("value")
    fileName = this.getAttribute("file")
    fileIcon = this.getAttribute("icon")
    fileSize = this.getAttribute("size")
    fileSize = bytesToSize(fileSize)
    fileDate = this.getAttribute("date")
    checkDirFile(filePath, fileName, fileIcon, fileSize, fileDate);
  });
}
function assignDeleteBtn() {
  deleteItems = document.querySelectorAll(".deleteBtn")
  for (var i = 0; i < deleteItems.length; i++) {
    deleteItems[i].addEventListener("click", function () {
      fileName = this.getAttribute("file")
      filePath = this.getAttribute("path")
      modalTitle.innerHTML = `Delete file?`
      modalBody.innerHTML = `<p>Are you sure that you want to DELETE the file <h5>"${fileName}"</h5>?</p>`
      actionBtn.innerHTML = `<form action="delete.php" method="post">
    <input type="hidden" name="file_path" value="${filePath}${fileName}">
    <button class="btn btn-danger" value="Delete">Delete</button>
  </form>`
    })
  }
}
function assignRenameBtn() {
  renameItems = document.querySelectorAll(".renameBtn")
  for (var i = 0; i < renameItems.length; i++) {
    renameItems[i].addEventListener("click", function () {
      fileName = this.getAttribute("file")
      filePath = this.getAttribute("path")
      modalTitle.innerHTML = `Rename file?`
      modalBody.innerHTML = `<p>Write the new name for the file</p> <form action="rename.php" method="post" id="renameForm">
    <input type="hidden" name="value" value="${filePath}${fileName}">
    <input type="text" name="rename">
    </form>
 `
      actionBtn.innerHTML = `
    <button class="btn btn-primary" form="renameForm" type="submit">Rename</button>
 `
    })
  }
}
assignRenameBtn()
assignDeleteBtn()