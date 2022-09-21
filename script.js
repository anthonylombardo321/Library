//Form Variables
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookCompletedPagesInput = document.getElementById("book-completed-pages");
const bookTotalPagesInput = document.getElementById("book-total-pages")
const readBookCheckbox = document.getElementById("read-check");
const bookForm = document.getElementById("book-form");

//Variables to Change Upon Submit
const bookList = document.querySelector(".book-list");
const totalBooksNumber = document.querySelector(".books-total");
const completedBooksNumber = document.querySelector(".books-completed");
const completedPagesNumber = document.querySelector(".pages-completed");
const totalPagesNumber = document.querySelector(".pages-total");

//Array to store Book Objects
let myLibrary = [];

function Book(title, author, pagesCompleted, totalPages, hasRead) {
    this.title = title;
    this.author = author;
    this.pagesCompleted = pagesCompleted;
    this.totalPages = totalPages;
    this.hasRead = hasRead;
}

function displayBook(book, index) {
    let bookRow = document.createElement("tr");
    bookRow.classList.add(`book${index+1}`);
    bookList.appendChild(bookRow);
    //Book Title
    let bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;
    bookRow.appendChild(bookTitle);
    //Book Author
    let bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;
    bookRow.appendChild(bookAuthor);
    //Book Pages
    let bookPages = document.createElement("td");
    bookPages.classList.add("page-counter");
    let decreasePageCount = document.createElement("button")
    decreasePageCount.classList.add("decrease-count");
    decreasePageCount.textContent = "-";
    let completedPages = document.createElement("span")
    completedPages.classList.add("completed-pages");
    completedPages.textContent = book.pagesCompleted;
    let divider = document.createElement("span");
    divider.textContent = "/";
    let totalPages = document.createElement("span");
    totalPages.classList.add("total-pages");
    totalPages.textContent = book.totalPages;
    let increasePageCount = document.createElement("button");
    increasePageCount.classList.add("increase-count");
    increasePageCount.textContent = "+";

    bookPages.appendChild(decreasePageCount);
    bookPages.appendChild(completedPages);
    bookPages.appendChild(divider);
    bookPages.appendChild(totalPages);
    bookPages.appendChild(increasePageCount);
    bookRow.appendChild(bookPages);
    //Book Status
    let bookStatus = document.createElement("td");
    let statusButton = document.createElement("button");
    if(book.hasRead) {
        statusButton.textContent = "Read";
        statusButton.classList.add("read");
    } else {
        statusButton.textContent = "Not Read"
    }
    statusButton.classList.add("status-button");
    bookStatus.appendChild(statusButton);
    bookRow.appendChild(bookStatus);
    //Remove
    let deleteBook = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book"
    deleteButton.classList.add("delete-button");
    deleteBook.appendChild(deleteButton);
    bookRow.appendChild(deleteBook);
}

function displayBooksInLibrary() {
    bookList.textContent = "";
    for(let i = 0; i < myLibrary.length; i++) {
        let newBook = myLibrary[i];
        displayBook(newBook, i);
    }
    displayLibraryInfo();
}

function displayLibraryInfo() {
    let totalBooksCount = myLibrary.length;
    let completedBooksCount = 0;
    let completedPagesCount = 0;
    let totalPagesCount = 0;
    for(let i = 0; i < myLibrary.length; i++) {
        let currentBook = myLibrary[i];
        if(currentBook.hasRead){
            completedBooksCount += 1;
        }
        completedPagesCount += currentBook.pagesCompleted;
        totalPagesCount += currentBook.totalPages;
    }
    totalBooksNumber.textContent = totalBooksCount;
    completedBooksNumber.textContent = completedBooksCount;
    completedPagesNumber.textContent = completedPagesCount;
    totalPagesNumber.textContent = totalPagesCount;
}

function deleteBookFromLibrary(bookPosition) {
    myLibrary.splice(bookPosition, 1);
}

function updateBookStatus(bookPosition) {
    let currentBook = myLibrary[bookPosition];
    if(currentBook.hasRead) {
        currentBook.hasRead = false;
    } else {
        currentBook.hasRead = true;
        currentBook.pagesCompleted = currentBook.totalPages;
    }
}

function increaseCompletedPageCount(bookPosition) {
    let currentBook = myLibrary[bookPosition];
    currentBook.pagesCompleted += 1;
    if(currentBook.pagesCompleted > currentBook.totalPages) {
        currentBook.pagesCompleted = currentBook.totalPages;
    }
    if(currentBook.pagesCompleted === currentBook.totalPages) {
        currentBook.hasRead = true;
    }
}

function decreaseCompletedPageCount(bookPosition) {
    let currentBook = myLibrary[bookPosition];
    if(currentBook.pagesCompleted === currentBook.totalPages) {
        currentBook.hasRead = false;
    }
    currentBook.pagesCompleted -= 1;
    if(currentBook.pagesCompleted < 0) {
        currentBook.pagesCompleted = 0;
    }
}

//JavaScript Form Validation
bookCompletedPagesInput.addEventListener("input", () => {
    if(bookCompletedPagesInput.value > bookTotalPagesInput.value) {
        bookCompletedPagesInput.value = bookTotalPagesInput.value;
    }
});

readBookCheckbox.addEventListener("change", (e) => {
    if(e.target.checked) {
        bookCompletedPagesInput.value = bookTotalPagesInput.value;
    }
})

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = bookTitleInput.value;
    if(bookAuthorInput.value === "") bookAuthorInput.value = "Anonymous";
    let author = bookAuthorInput.value;
    if(bookCompletedPagesInput.value === "") bookCompletedPagesInput.value = "0";
    let completedPages = parseInt(bookCompletedPagesInput.value);
    let totalPages = parseInt(bookTotalPagesInput.value);
    let hasRead = readBookCheckbox.checked;
    let newBook = new Book(title, author, completedPages, totalPages, hasRead);
    myLibrary.push(newBook);
    displayBooksInLibrary();
});

bookList.addEventListener("click", (e) => {
    let bookPosition = parseInt(e.target.parentNode.parentNode.className.substr(-1));
    if(e.target.classList.contains("decrease-count")){
        decreaseCompletedPageCount(bookPosition-1);
    }
    if(e.target.classList.contains("increase-count")){
        increaseCompletedPageCount(bookPosition-1);
    }
    if(e.target.classList.contains("status-button")) {
        updateBookStatus(bookPosition-1)
    }
    if(e.target.classList.contains("delete-button")) {
        deleteBookFromLibrary(bookPosition-1);
    }
    displayBooksInLibrary();
});

displayBooksInLibrary();