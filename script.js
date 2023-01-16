let filePath
let fileName
let fileSize
let fileIcon
let fileDate
let titleInfo = document.querySelector("#titleInfo")
let iconInfo = document.querySelector("#iconInfo")
let sizeInfo = document.querySelector("#sizeInfo")
let dateInfo = document.querySelector("#dateInfo")
let modalTitle = document.querySelector("#modal-title")
let modalBody = document.querySelector("#modal-body")
let actionBtn = document.querySelector("#action-btn")



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
var deleteItems = document.querySelectorAll(".deleteBtn")
for (var i = 0; i < deleteItems.length; i++) {
  deleteItems[i].addEventListener("click", function () {
    fileName = this.getAttribute("file")
    filePath = this.getAttribute("path")
    modalTitle.innerHTML = `Delete file?`
    modalBody.innerHTML = `<p>Are you sure that you want to DELETE the file <h5>"${fileName}"</h5>?</p>`
    actionBtn.innerHTML = `<form action="delete.php" method="post">
    <input type="hidden" name="file_path" value="${filePath}/${fileName}">
    <button class="btn btn-danger" value="Delete">Delete</button>
  </form>`
  })
}