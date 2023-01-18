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
let directory1 = document.querySelector("#directory1ul")
let directory2 = document.querySelector("#directory2ul")
let directory3 = document.querySelector("#directory3ul")
let directory4 = document.querySelector("#directory4ul")
let actionBtns = document.querySelector("#actionBtns")
let itemInfo = document.querySelector("#itemInfo")
let mainPage = document.querySelector("#mainPage")
var counter

function fillDirectory(icon, path, name) {

  if (icon == "folder") {

    fetch(`get_files.php?directory=${path}/${name}`)
      .then(response => response.json())
      .then(data => {

        if (!(counter == name)) {
          for (let i = 0; i < data.length; i++) {
            directory1.innerHTML += `<li class="list-group-item dirItem" value="${path}${data[i].file}" icon="${data[i].icono}" file="${data[i].file}" size="${data[i].fileSize}" date="${data[i].fileDate}">
        <div class="dirItemBOX"><span class="material-symbols-outlined">${data[i].icono}</span> 
          <span><a href="${path}${data[i].file}">${data[i].file}</a></span></div>
          <div class="dirItemBOX" ><span class="material-symbols-outlined deleteBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${data[i].file}" path="${path}">delete</span>
          <span class="material-symbols-outlined renameBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${data[i].file}" path="${path}">edit</span></div>
      </li>`
          }
          counter = name
          assignBtns()
          assignRenameBtn()
          assignDeleteBtn()
        } else {
          console.log("hola");
        }
        
      })

  } else {
    console.log(icon);
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

function checkDirFile(path, name, icon, size, date, extension) {
  itemInfo.style.display = "block"
  mainPage.style.gridTemplateColumns = "75% 25%"
  titleInfo.innerHTML = `${name}`
  iconInfo.innerHTML = `${icon}`
  sizeInfo.innerHTML = `${size}`
  dateInfo.innerHTML = `${date}`
  pathInfo.innerHTML = `${path}${name}`
  extensionInfo.innerHTML = `${extension}`
  
  actionBtns.innerHTML = `<span class="material-symbols-outlined deleteBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${name}" path="${path}">delete</span>
  <span class="material-symbols-outlined renameBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${name}" path="${path}">edit</span>`
  assignRenameBtn()
  assignDeleteBtn()
  fillDirectory(icon, path, name)
}

function assignBtns(flag, SearchResults) {
if (flag) {
  var items = document.querySelectorAll(".dirItem");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      filePath = this.getAttribute("value")
      fileName = this.getAttribute("file")
      fileIcon = this.getAttribute("icon")
      fileSize = this.getAttribute("size")
      extension = this.getAttribute("extension")
      fileSize = bytesToSize(fileSize)
      fileDate = this.getAttribute("date")
      checkDirFile(filePath, fileName, fileIcon, fileSize, fileDate, extension)
    });
  }
} else { 
  for (let i = 0; i < SearchResults.length; i++) {
    console.log('hola')
    let filePath2 = SearchResults.name;
    let fileName2 = SearchResults.name;
    // fileIcon = this.getAttribute("icon")
    let fileSize2 = SearchResults.size;
    fileSize2 = bytesToSize(fileSize2)
    let fileDate2 = SearchResults.date;
    console.log(filepath2)
    checkDirFile(filePath2, fileName2, fileIcon2, fileSize2, fileDate2)
  };
}}

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

const form = document.getElementById("searchForm");
form.addEventListener("submit", searchResults);

function searchResults (e) {
  e.preventDefault(); 
  const input = e.target.querySelector("input[type='text']");
  const inputValue = input.value;

    url = `"http://localhost/indexer/search.php?path=uploads/&search=${inputValue}"`;
    console.log(url);
    
    // Use the fetch API to send the POST request
    fetch(`http://localhost/indexer/search.php?path=uploads/&search=${inputValue}`)
        .then(response => response.json())
        .then(data => {
          
            
            const arrElements = Object.entries(data);
            
            let father = document.querySelector('#directory1ul');
            
            for (let i = 0; i < arrElements.length; i++) {
              
              let item = arrElements[i];
              console.log(item)
              let itemReal = item[1];
              
              let name = itemReal.name;
              console.log(name)
              let size = itemReal.size;
              console.log(size)
              let date = itemReal.lastModify;
              const home = document.getElementById("directoryHome");
              home.style.display = "none";

              father.innerHTML += `<li class="list-group-item dirItem" value="${name}" icon="" file="'${name}'" size="${size}" date="${date}">
                <div class="dirItemBOX"><span class="material-symbols-outlined"></span> 
                <span><a href="uploads/${name}">"${name}"</a></span></div>
                <div class="dirItemBOX" ><span class="material-symbols-outlined deleteBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${name}" path="uploads/${name}">delete</span>
                <span class="material-symbols-outlined renameBtn"  data-bs-toggle="modal" data-bs-target="#modal" file="${name}" path="uploads/${name}">edit</span></div>
            </li>`;
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            // console.error(error);
        }); // gets the value of the text input
  // Do something with the inputValue
};






assignRenameBtn()
assignDeleteBtn()
assignBtns(true)