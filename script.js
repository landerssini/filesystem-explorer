let filePath 
let fileName
let fileIcon
let titleInfo = document.querySelector("#titleInfo")
let iconInfo = document.querySelector("#iconInfo")
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

function checkDirFile(path, name, icon) {
  titleInfo.innerHTML= `${name}`
  iconInfo.innerHTML= `${icon}`
  console.log(icon)
}

var items = document.querySelectorAll(".dirItem");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    filePath = this.getAttribute("value")
    fileName = this.getAttribute("file")
    fileIcon = this.getAttribute("icon")
    checkDirFile(filePath,fileName,fileIcon);
  });
}