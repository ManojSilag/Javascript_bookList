//Book class: Represent a Book
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class: Handle UI tasks
class UI {
    static displayBook(){
        const StoreBooks = [
            {
                title: "Life",
                author: 'Manoj',
                isbn: '3244432'
            }
        ]
        const books = StoreBooks;
        books.forEach((book) => UI.addBooTOList(book));
    }
    static addBooTOList(book){
      const list = document.querySelector('#book-list');

      const row =document.createElement('tr');
      row.innerHTML=`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('title').value = '';
        document.querySelector('author').value = '';
        document.querySelector('isbn').value = '';
    }
}

//Store class: Handles Local storage

//Events : Display Books
document.addEventListener('DOMContentLoaded',UI.displayBook);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>
{
    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Instatiate book
    const book = new Book(title, author, isbn);

    //Add Book to UI
    UI.addBooTOList(book);

    //Clear fields
    UI.clearFields();


    //Prevent actual submit
    e.preventDefault();
    
});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>
{

 UI.deleteBook(e.target);

});