const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

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
  displayBook()
}

function updateBookDataToStorage() {
  if (storageCheck()) saveBookData();
}

function createBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function changeComplete(id){
  const bookIndex = books.findIndex(obj => obj.id == id);
  if (books[bookIndex].isComplete == false){
    books[bookIndex].isComplete = true
  } else books[bookIndex].isComplete = false

  let complete = document.getElementById("completeBookshelfList");
  let incomplete = document.getElementById("incompleteBookshelfList");

  complete.innerHTML = '';
  incomplete.innerHTML = '';

  saveBookData()
  loadBookFromStorage();

}

function deleteBook(id){
  let newBooks = books.filter(x => x.id !== id);

  let complete = document.getElementById("completeBookshelfList");
  let incomplete = document.getElementById("incompleteBookshelfList");

  complete.innerHTML = '';
  incomplete.innerHTML = '';
  books = newBooks;
  saveBookData()
  loadBookFromStorage();
}