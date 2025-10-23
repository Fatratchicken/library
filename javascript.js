const myLibrary = [];
const newBookButton = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');

const form = document.querySelector('form');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.id = crypto.randomUUID();
}

function addBooksToLibrary(title, author, pages, read){
    const currentBook = new Book(title, author, pages, read);

    myLibrary.push(currentBook);
}

function displayMyLibrary(){
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    for (let book of myLibrary){
        console.log(book)
        const newBook = document.createElement('tr');
        tableBody.appendChild(newBook);

        for (let value in book){
            const newCell = document.createElement('td');
            newCell.textContent = book[value];
            newBook.appendChild(newCell);
        }

        
    }
}

newBookButton.addEventListener('click', () => dialog.showModal());

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read');


    addBooksToLibrary(title, author, pages, read);
    displayMyLibrary();
    dialog.close();
});



