const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];
let bookItem = [];

function storageCheck() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Your browser doesn't support local storage");
    return false;
  }
  return true;
}

function saveBookData() {
  const parsedData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsedData);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadBookFromStorage() {
  const sortedData = localStorage.getItem(STORAGE_KEY);

  let booksData = JSON.parse(sortedData);

  if (booksData !== null) books = booksData;
  document.dispatchEvent(new Event("ondataload"));
  document.getElementById("inputBook").reset();
  displayBook();
}

function updateBookDataToStorage() {
  if (storageCheck()) saveBookData();
}

function createBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
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

    let complete = document.getElementById("completeBookshelfList");
    let incomplete = document.getElementById("incompleteBookshelfList");
    complete.innerHTML = "";
    incomplete.innerHTML = "";

    saveBookData();
    loadBookFromStorage();
    window.alert("Data buku berhasil diubah!");
  }
  updateBookDataToStorage();
}

function editBook(id) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const bookIndex = books.findIndex((obj) => obj.id == id);
  bookItem = books[bookIndex];
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

function deleteBook(id) {
  let confirm = window.confirm("Apakah anda yakin untuk menghapus buku ini?");

  if (confirm == true) {
    let newBooks = books.filter((x) => x.id !== id);

    let complete = document.getElementById("completeBookshelfList");
    let incomplete = document.getElementById("incompleteBookshelfList");

    complete.innerHTML = "";
    incomplete.innerHTML = "";
    books = newBooks;
    bookItem = [];
    saveBookData();
    loadBookFromStorage();
    window.alert("Data buku berhasil dihapus!");
  } else {
    return 0;
  }
}
