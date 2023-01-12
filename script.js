function checkDirFile(e) {
    console.log(e)
}

var items = document.querySelectorAll(".dirItem");
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function() {
            checkDirFile(this.getAttribute("data-archivo"));
        });
    }