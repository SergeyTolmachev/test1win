const book = require('../models/Book');


module.exports.getAllBooks = async (ctx, next) => {
  let groupBy = ctx.query.groupBy;
  let orderBy = ctx.query.orderBy;
  let page = ctx.query.page;
  let result = await book.findAllBooks(orderBy, groupBy, page);
  if (result){
    ctx.status = 200;
    ctx.body = result;
  } else {
    ctx.status = 204;
  }
};


module.exports.getBook = async (ctx, next) => {
  let bookId = ctx.params.bookId;
  let findedBook = await book.findOneBook(bookId);
  if (!findedBook){
    ctx.status = 204;
  } else {
    ctx.status = 200;
    ctx.body = findedBook;
  }

};

module.exports.createBook = async (ctx, next) => {
  if (!book.checkCorrectData(ctx.request.body)) {
    ctx.status = 400;
    ctx.res.end('Неверные данные для создания книги');
  }
  ctx.request.body.date = new Date(Date.parse(ctx.request.body.date));
  if (!await book.createBook(ctx.request.body)){
    ctx.status = 501;
    ctx.body = {message: 'Ошибка при сохранении книги'};
  } else {
    ctx.status = 201;
    ctx.body = {message: 'Книга успешно добавлена'};
  }

};

module.exports.updateBook = async (ctx, next) => {
  let bookId = ctx.params.bookId;
  let bookData = ctx.request.body;
  if (!await book.updateBook(bookId, bookData)){
    ctx.status = 501;
    ctx.body = {message: 'Ошибка обновления данных'};
  } else {
    ctx.status = 201;
    ctx.body = {message: 'Данные успешно обновлены'};
  }
};
