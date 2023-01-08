const select = {
  templateOf: {
    booksList: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
  },
};

const templates = {
  booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
};

function render() {
  for(let book of dataSource.books) {
    const generatedHTML = templates.booksList(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    const bookContainer = document.querySelector(select.containerOf.booksList);

    bookContainer.appendChild(element);
  }
}

render();
