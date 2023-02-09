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
  this.pages = pages;
  this.isRead = isRead;
}
// Add book function
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
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

  // Adding new Book to DOM
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  libraryContainer.appendChild(bookContainer);

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
  bookHasRead.textContent = hasRead === "true";

  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(bookAuthor);
  bookContainer.appendChild(bookPages);
  bookContainer.appendChild(bookHasRead);

  // Clear the form after adding
  webpage.classList.remove("blurred");
  overlay.style.display = "none";
  addBookToLibrary(title, author, parseFloat(pages), hasRead === "true");
  console.table(myLibrary);
  bookForm.reset();
});

// Close Button Listener
closeButton.addEventListener("click", () => {
  webpage.classList.remove("blurred");
  overlay.style.display = "none";
});
