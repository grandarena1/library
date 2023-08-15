//HTML Elements
const BOOK_CONTAINER = document.getElementsByClassName("book-content")[0];
const BOOK_CONTENT = document.getElementsByClassName("book-content")[0];
const ADD_BOOK_BUTTON_CONTAINER = document.getElementsByClassName("add-book-button-container")[0];

//Form Elements
const FORM = document.getElementsByClassName("form")[0];
const FORM_TITLE = FORM.querySelector("#title");
const FORM_AUTHOR = FORM.querySelector("#author");
const FORM_PAGES = FORM.querySelector("#pages");
const FORM_READ_STATUS = FORM.querySelector("#read");

let myLibrary = [];

class Book {
  constructor(title, author, pages, isItRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isItRead = isItRead;
  }
  
    getInfo()
    {
      return `${this.title} ${this.author} ${this.pages} ${this.isItRead}`;
    }
}

/*function Book(title, author, pages, isItRead) 
{
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isItRead = isItRead;
  this.getInfo = function()
  {
    return title + " " + author + " " + pages + " " + isItRead;
  }
}*/

function displayBooks()
{
  while(BOOK_CONTAINER.firstChild) 
  {
    BOOK_CONTAINER.removeChild(BOOK_CONTAINER.firstChild);
  }

  for(let i = 0; i < myLibrary.length; i++)
  {
    //Create book UI
    const book = document.createElement('div');
    book.setAttribute('class', 'book');

    //Set title
    const book_title = document.createElement('h2');
    book_title.innerText = myLibrary[i].title;
    book.appendChild(book_title);

    //Set author
    const book_author = document.createElement('h3');
    book_author.innerText = myLibrary[i].author;
    book.appendChild(book_author);

    //Set pages
    const book_pages = document.createElement('h3');
    book_pages.innerText = myLibrary[i].pages;
    book.appendChild(book_pages);

    //Read status
    const read_status = document.createElement('h3');
    read_status.innerText = myLibrary[i].isItRead;
    book.appendChild(read_status);

    //Remove button container
    const btn_remove_container = document.createElement('div');
    btn_remove_container.setAttribute('class', 'remove-btn-container');
    book.appendChild(btn_remove_container);

    //Remove button
    const remove_button = document.createElement('button');
    remove_button.innerText = 'x';
    remove_button.setAttribute('id', 'btn-remove-book');
    remove_button.addEventListener('click', () => removeBookFromLibrary(i));
    btn_remove_container.appendChild(remove_button);

    //Parent to book container
    BOOK_CONTAINER.appendChild(book);
  }
}

function addBookToLibrary() 
{
  const newBook = new Book(FORM_TITLE.value, FORM_AUTHOR.value, FORM_PAGES.value, FORM_READ_STATUS.value);
  myLibrary.push(newBook);
  
  displayBooks();
}

function showForm()
{
  BOOK_CONTENT.classList.add('hidden');
  ADD_BOOK_BUTTON_CONTAINER.classList.add('hidden');
  FORM.classList.remove('hidden');
}

function toggleReadStatus()
{
  if(FORM_READ_STATUS.checked)
  {
    FORM_READ_STATUS.value = 'Read';
  }
  else
  {
    FORM_READ_STATUS.value = 'Not read';
  }
}

function submitForm()
{
  const title = FORM_TITLE.value.trim();
  const author = FORM_AUTHOR.value.trim();
  const pages = FORM_PAGES.value.trim();

  // Check if title, author, and pages are not empty
  if (title === "" || author === "" || pages === "") {
    alert("Please fill in all the fields.");
    return;
  }

  const parsedPages = parseInt(pages, 10);

  // Check if pages input contains a valid number within the acceptable range
  if (isNaN(parsedPages) || parsedPages <= 0 || parsedPages > 1000) {
    alert("Please enter a valid number of pages (1-1000).");
    return;
  }

  addBookToLibrary();
  cancelForm();
}

function resetForm()
{
  //Clear form inputs
  FORM_TITLE.value = "";
  FORM_AUTHOR.value = "";
  FORM_PAGES.value = "";
  FORM_READ_STATUS.checked = false;
  FORM_READ_STATUS.value = 'Not read';
}

function cancelForm()
{
  resetForm();

  //Hide form
  FORM.classList.add('hidden');
  BOOK_CONTENT.classList.remove('hidden');
  ADD_BOOK_BUTTON_CONTAINER.classList.remove('hidden');
}

function removeBookFromLibrary(index)
{
  myLibrary.splice(index, 1);
  displayBooks();
}