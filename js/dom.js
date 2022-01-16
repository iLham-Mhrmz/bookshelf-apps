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
  console.log(books);
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

function addBook() {
  const inputTitle = document.getElementById("inputBookTitle").value;
  const inputAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = parseInt(
    document.getElementById("inputBookYear").value
  );

  let inputIsComplete = false;
  if (document.getElementById("inputBookIsComplete").checked) {
    inputIsComplete = true;
  }

  if (bookItem.length === 0) {
    let id = +new Date();

    const bookObject = createBookObject(
      id,
      inputTitle,
      inputAuthor,
      inputBookYear,
      inputIsComplete
    );

    createBookShelf(
      bookObject.id,
      inputTitle,
      inputAuthor,
      inputBookYear,
      inputIsComplete
    );

    books.push(bookObject);
  } else {
    const bookIndex = books.findIndex((obj) => obj.id == bookItem.id);
    if (bookItem) {
      books[bookIndex].title = inputTitle;
      books[bookIndex].author = inputAuthor;
      books[bookIndex].year = inputBookYear;
      books[bookIndex].isComplete = inputIsComplete;
    }

    console.log(books[bookIndex]);
    let complete = document.getElementById("completeBookshelfList");
    let incomplete = document.getElementById("incompleteBookshelfList");
    complete.innerHTML = "";
    incomplete.innerHTML = "";

    saveBookData();
    loadBookFromStorage();
  }
  updateBookDataToStorage();
}

function editBook(id) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const bookIndex = books.findIndex((obj) => obj.id == id);
  bookItem = books[bookIndex];
  console.log(bookItem);
  const inputTitle = document.getElementById("inputBookTitle");
  inputTitle.value = `${bookItem.title}`;
  const inputAuthor = document.getElementById("inputBookAuthor");
  inputAuthor.value = `${bookItem.author}`;
  const inputBookYear = document.getElementById("inputBookYear");
  inputBookYear.value = `${parseInt(bookItem.year)}`;

  if (bookItem.isComplete == true) {
    document.getElementById("inputBookIsComplete").checked = true;
  }
}
