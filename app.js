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
        const StoreBooks = Store.getBooks();
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

    static deleteBook(el){
     if(el.classList.contains('delete')){
         el.parentElement.parentElement.remove();
     }
    }

    static showAlert(message,className){
      const div = document.createElement('div');
      div.className =`alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div,form);
      //Vanish in 2 seconds
      setTimeout(() => document.querySelector('.alert').remove()
      ,2000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store class: Handles Local storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
         return books;

    }
    static addBook(book){
     const books = Store.getBooks();
     books.push(book);
     localStorage.setItem('books',JSON.stringify(books));
    } 
    static removeBook(isbn){
    const books = Store.getBooks();
    
    books.forEach((book,index) => {
        if(book.isbn === isbn){
            books.splice(index, 1);

        }
    });
    localStorage.setItem('books',JSON.stringify(books));
    }
}

//Events : Display Books
document.addEventListener('DOMContentLoaded',UI.displayBook);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>
{
    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if(title === '' ||  author === ''|| isbn === '') {
        UI.showAlert(' Please fill all fields','info')
    } else {
            //Instatiate book
    const book = new Book(title, author, isbn);

    //Add Book to UI
    UI.addBooTOList(book);
  
    //Add book to local storage
    Store.addBook(book);

    //Show success message
    UI.showAlert('Book Added' , 'success');

    //Clear fields
    UI.clearFields();
    }

    //Prevent actual submit
     e.preventDefault();
    
});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>
{

 UI.deleteBook(e.target);

     //Remove from local storage
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

     //Show remove message
     UI.showAlert('Book Removed' , 'danger');

});