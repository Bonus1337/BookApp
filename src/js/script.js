const select = {
  templateOf: {
    booksList: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
    booksImage: '.books-list .book__image',
    filters: '.filters',
  },
};
  
const classNames = {
  books: {
    favorite: 'favorite',
  },
};
  
const templates = {
  booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
};
  
class BooksList {
  constructor() {
    const thisBook = this;
  
    thisBook.initData();
    thisBook.getElements();
    thisBook.render();
    thisBook.initActions();
  }
  render() {
    const thisBook = this;
      
    for(let book of thisBook.data) {
      book.ratingBgc = thisBook.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
  
      const generatedHTML = templates.booksList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      
      thisBook.dom.booksList.appendChild(element);
    }
  }
  initData() {
    const thisBook = this;
  
    thisBook.data = dataSource.books;
    thisBook.favoriteBooks = [];
    thisBook.filters = [];
  }
  getElements() {
    const thisBook = this;
  
    thisBook.dom = {};
    thisBook.dom.booksList = document.querySelector(select.containerOf.booksList);
    thisBook.dom.filters = document.querySelector(select.containerOf.filters);
  }
  initActions() {
    const thisBook = this;
  
    thisBook.dom.booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const targetBook = event.target.offsetParent;
      const targetBookId = targetBook.getAttribute('data-id');
    
      if(!targetBook.classList.contains(classNames.books.favorite)) {
        targetBook.classList.add(classNames.books.favorite);
        if(thisBook.favoriteBooks.indexOf(targetBookId) == -1) {
          thisBook.favoriteBooks.push(targetBookId);
        }
      } else {
        const bookIdx = thisBook.favoriteBooks.indexOf(targetBookId);
        targetBook.classList.remove(classNames.books.favorite);
        if(bookIdx != -1) {
          thisBook.favoriteBooks.splice(bookIdx, 1);
        }
      }
    });
    
    thisBook.dom.filters.addEventListener('click', function(event) {
      const target = event.target;
      if(target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter') {
        if(target.checked) {
          thisBook.filters.push(target.value);
        } else {
          const filterIdx = thisBook.filters.indexOf(target.value);
          thisBook.filters.splice(filterIdx, 1);
        }
        console.log(target.value);
        thisBook.filterBooks();
      }
    });
  }
  filterBooks() {
    const thisBook = this;
    for(let book of thisBook.data) {
      let shouldBeHidden = false;
      let bookTarget = document.querySelector('[data-id="' + book.id + '"');
      for(let filter of thisBook.filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      (shouldBeHidden) ? (bookTarget.classList.add('hidden')) : (bookTarget.classList.remove('hidden'));
    }
  }
  determineRatingBgc(rating) {
    let ratingBg = '';
    if(rating < 6) ratingBg = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    else if(rating > 6 && rating <= 8) ratingBg = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if(rating > 8 && rating <= 9) ratingBg = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else if(rating > 9) ratingBg = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    return ratingBg;
  }
}
  
const app = new BooksList();
console.log(app);
  