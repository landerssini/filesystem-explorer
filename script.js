function deleteFile(file_path) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
      }
    };
    xhttp.open("GET", "delete.php?file_path="+file_path, true);
    xhttp.send();
  }
