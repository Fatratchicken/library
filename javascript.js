const myLibrary = [];

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
    for (let book in myLibrary){
        
    }
}

// addBooksToLibrary('sapeins', 'yoval', 123, true);

// console.table(myLibrary);
