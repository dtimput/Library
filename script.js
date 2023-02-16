/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */

// DOM Elements - Containers
const webpage = document.querySelector(".container");
const libraryContainer = document.querySelector(".library-container");
const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".book-form");

// DOM Elements - Buttons
const addBookButton = document.querySelector(".add-book-button");
const closeButton = document.querySelector(".close-overlay");

// DOM Elements - Book Log Display
const totalBooks = document.querySelector(".total-books");
const booksRead = document.querySelector(".books-read");
const booksToRead = document.querySelector(".books-to-read");

// Array that stores all book objects
const myLibrary = [
  { title: "Scythe", author: "Neal Scusterman", pages: 445, isRead: true },
];

// Switched to using Class instead of an object constructor
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = parseFloat(pages);
    this.isRead = isRead === "true";
  }
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

  // Check array for number of objects that have isRead as true
  const booksAlreadyRead = myLibrary.filter(
    (isRead) => isRead.isRead === true
  ).length;

  // Updates Book Log DOM
  totalBooks.textContent = `Total Books: ${myLibrary.length}`;
  booksRead.textContent = `Books Already Read: ${booksAlreadyRead}`;
  booksToRead.textContent = `Books To Read: ${
    myLibrary.length - booksAlreadyRead
  } `;

  for (let i = 0; i < myLibrary.length; i++) {
    // Stores each attribute in a variable
    const title = myLibrary[i].title;
    const author = myLibrary[i].author;
    const pages = myLibrary[i].pages;
    const hasRead = myLibrary[i].isRead;

    // Adds each Book to the DOM
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");
    bookContainer.setAttribute("id", i);
    libraryContainer.appendChild(bookContainer);

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = "Title: " + title;
    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = "By: " + author;
    const bookPages = document.createElement("div");
    bookPages.classList.add("book-pages");
    bookPages.textContent = "Number of Pages: " + pages;
    const bookHasRead = document.createElement("div");
    bookHasRead.classList.add("book-read");
    bookHasRead.textContent = "Read?: ";

    // Adds Checkbox to read
    const readCheckBox = document.createElement("input");
    readCheckBox.setAttribute("type", "checkbox");
    readCheckBox.classList.add("read-check");

    if (hasRead === true) {
      readCheckBox.setAttribute("checked", "checked");
    }

    // Add event listener to every new object created
    readCheckBox.addEventListener("change", (event) => {
      const objectNumber = event.currentTarget.parentNode.parentNode.id;
      if (readCheckBox.checked) {
        myLibrary[objectNumber].isRead = true;
        updateDisplay();
      } else {
        myLibrary[objectNumber].isRead = false;
        updateDisplay();
      }
    });

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookHasRead);
    bookHasRead.appendChild(readCheckBox);
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

// Intitialize array with first object to DOM
updateDisplay();
