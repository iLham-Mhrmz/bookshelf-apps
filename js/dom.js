function displayBook() {
  if (books.length !== 0) {
    books.forEach((book) => {
      createBookShelf(
        book.id,
        book.title,
        book.author,
        book.year,
        book.isComplete
      );
    });
  }
}

function createBookShelf(id, title, author, year, inputIsComplete) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis: ${author}`;

  const textYear = document.createElement("p");
  textYear.innerText = `Year: ${year}`;

  const isComplete = inputIsComplete;

  const btnRead = document.createElement("button");
  btnRead.classList.add("green");
  btnRead.setAttribute("onclick", `changeComplete(${id})`);

  if (isComplete === false) {
    btnRead.innerText = "Selesai dibaca";
  } else btnRead.innerText = "Belum selesai";

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("blue");
  btnEdit.setAttribute("onclick", `editBook(${id})`);
  btnEdit.innerText = "Edit buku";

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("red");
  btnDelete.setAttribute("onclick", `deleteBook(${id})`);
  btnDelete.innerText = "hapus Buku";

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("action");
  btnContainer.append(btnRead, btnEdit, btnDelete);

  const article = document.createElement("article");
  article.classList.add("book_item");
  article.append(textTitle, textAuthor, textYear, btnContainer);

  const bookContainer = document.getElementsByClassName("book_list");
  if (isComplete === false) {
    bookContainer[0].append(article);
  } else bookContainer[1].append(article);
}

function changeComplete(id) {
  const bookIndex = books.findIndex((obj) => obj.id == id);
  if (books[bookIndex].isComplete == false) {
    books[bookIndex].isComplete = true;
  } else books[bookIndex].isComplete = false;

  let complete = document.getElementById("completeBookshelfList");
  let incomplete = document.getElementById("incompleteBookshelfList");

  complete.innerHTML = "";
  incomplete.innerHTML = "";

  saveBookData();
  loadBookFromStorage();
}