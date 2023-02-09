/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
// Variables
const webpage = document.querySelector(".container");
const libraryContainer = document.querySelector(".library-container");
const addBookButton = document.querySelector(".add-book-button");
const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".book-form");
const closeButton = document.querySelector(".close-overlay");
const myLibrary = [
  { title: "Scythe", author: "Neal Scusterman", pages: 445, isRead: true },
];

// Object Constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = parseFloat(pages);
  this.isRead = isRead === "true";
}
// Add book function
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

// Removes All Book Elements from Library Container
function clearDisplay() {
  let libraryChild = libraryContainer.lastElementChild;
  while (libraryChild) {
    libraryContainer.removeChild(libraryChild);
    libraryChild = libraryContainer.lastElementChild;
  }
}

// Loops the Library array, and adds each Elements to the Library Container
function updateDisplay() {
  clearDisplay();

  for (let i = 0; i < myLibrary.length; i++) {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");
    libraryContainer.appendChild(bookContainer);

    const title = myLibrary[i].title;
    const author = myLibrary[i].author;
    const pages = myLibrary[i].pages;
    const hasRead = myLibrary[i].isRead;

    console.log(hasRead);

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = "Title: " + title;
    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = "By: " + author;
    const bookPages = document.createElement("div");
    bookPages.classList.add("book-pages");
    bookPages.textContent = "Number of Pages: " + parseFloat(pages);
    const bookHasRead = document.createElement("div");
    bookHasRead.classList.add("book-read");
    bookHasRead.textContent = hasRead;

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookHasRead);
  }
}

// Event Listeners

// Add Book Button Listener
addBookButton.addEventListener("click", () => {
  overlay.style.display = "block";
  webpage.classList.add("blurred");
});

// Submit Button Listener
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const hasRead = document.querySelector(
    'input[name="have_read"]:checked'
  ).value;

  // Clear the form after adding
  webpage.classList.remove("blurred");
  overlay.style.display = "none";
  addBookToLibrary(title, author, pages, hasRead);
  bookForm.reset();
  updateDisplay();
});

// Close Button Listener
closeButton.addEventListener("click", () => {
  webpage.classList.remove("blurred");
  overlay.style.display = "none";
});

updateDisplay();
