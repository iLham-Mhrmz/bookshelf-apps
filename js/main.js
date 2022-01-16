document.addEventListener("DOMContentLoaded", function(){

    const submitBook = document.getElementById("inputBook");

    submitBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
        document.getElementById("inputBook").reset();
    });

    if(storageCheck()){
        loadBookFromStorage();
    }
});

document.addEventListener("change", function () {
  let completion = document.getElementsByTagName("span");
  if (document.getElementById("inputBookIsComplete").checked) {
    completion[0].innerText = "Sudah selesai dibaca";
  } else completion[0].innerText = "Belum selesai dibaca";
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

