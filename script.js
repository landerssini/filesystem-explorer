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

function checkDirFile(e) {
  console.log(e)
}

var items = document.querySelectorAll(".dirItem");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    checkDirFile(this.getAttribute("value"));
  });
}