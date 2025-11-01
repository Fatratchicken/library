// Dom elements
const newBookButton = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const tableBody = document.querySelector('table tbody');

class Library{
    static books = [];

    static addBooksToLibrary(Book){
        this.books.push(Book);
        this.renderLibrary();
    }

    static renderLibrary(){
        tableBody.innerHTML = '';

        for (const book of this.books){
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



}

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = !!read;

        this.id = crypto.randomUUID();
    }

    toggleRead(){
        this.read = !this.read;
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

    const book = new Book (title, author, pages, read);

    Library.addBooksToLibrary(book);
    form.reset();
    dialog.close();
})

tableBody.addEventListener('click', (event) => {
  const target = event.target;

    if (target.matches('.del')) {
        const id = target.dataset.id;

        Library.books = Library.books.filter(b => b.id !== id);
        Library.renderLibrary();
        return;
    }

    if (target.matches('.toggle-read')) {
        const id = target.dataset.id;
        const book = Library.books.find(b => b.id === id);

        if (book) {
            book.toggleRead();
            Library.renderLibrary();
        }

    return;
  }


})
  
Library.renderLibrary();

