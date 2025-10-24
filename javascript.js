// Dom elements
let myLibrary = [];

const newBookButton = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const tableBody = document.querySelector('table tbody');

Book.prototype.toggleRead = function(){
    this.read = !this.read; //toggle it on and off
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = !!read; //force to boolean with !!

    this.id = crypto.randomUUID();
}

function addBooksToLibrary(title, author, pages, read){
    const currentBook = new Book(title, author, pages, read);

    myLibrary.push(currentBook);
    renderLibrary();
}

function renderLibrary(){
    tableBody.innerHTML = '';

    for (const book of myLibrary){
        const tr = document.createElement('tr');
        tr.dataset.id = book.id;

        const titleTd = document.createElement('td');
        titleTd.textContent = book.title;
        tr.appendChild(titleTd);

        const authorTd = document.createElement('td');
        authorTd.textContent = book.author;
        tr.appendChild(authorTd);

        const pagesTd = document.createElement('td');
        pagesTd.textContent = book.pages;
        tr.appendChild(pagesTd);

        const readTd = document.createElement('td');
        const readText = document.createElement('span');
        readText.textContent = book.read ? 'Yes' : 'No';
        readText.className = 'read-text';
        readTd.appendChild(readText);

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'toggle-read';
        toggleBtn.textContent = 'Toggle Read';
        toggleBtn.dataset.id = book.id;
        readTd.appendChild(toggleBtn);

        tr.appendChild(readTd);

        const delTd = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'del';
        delBtn.textContent = 'Delete';
        delBtn.dataset.id = book.id;
        delTd.appendChild(delBtn);
        tr.appendChild(delTd);

        tableBody.appendChild(tr);


    }

}

//event listeners
newBookButton.addEventListener('click', () => dialog.showModal());

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title')?.trim() || 'Untitled';
    const author = formData.get('author')?.trim() || 'Unknown';
    const pages = formData.get('pages')?.trim() || '0';
    const read = formData.get('read') ? true : false;

    addBooksToLibrary(title, author, pages, read);
    form.reset();
    dialog.close();
})

tableBody.addEventListener('click', (event) => {
  const target = event.target;

    if (target.matches('.del')) {
        const id = target.dataset.id;

        myLibrary = myLibrary.filter(b => b.id !== id);
        renderLibrary();
        return;
    }

    if (target.matches('.toggle-read')) {
        const id = target.dataset.id;
        const book = myLibrary.find(b => b.id === id);

        if (book) {
            book.toggleRead();
            renderLibrary();
        }

    return;
  }


})
  
renderLibrary();

