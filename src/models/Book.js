const connection = require('../config/connectToDatabase');
const casher = require('./Casher');

class Book {
  getQueryToDatabase(sql, data) {
    return new Promise((resolve, reject) => {
      connection.query(sql, data, (error, results) => {
        if (error) {
          console.log(error);
          resolve(false);
        }
        resolve(results);
      });
    });
  }

  insertQueryToDatabase(sql, data) {
    return new Promise((resolve, reject) => {
      connection.query(sql, data, (error, results) => {
        if (error) {
          console.log(error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  async createBook(bookData) {
    const sql = 'INSERT INTO books SET ? ';
    if (bookData.id) {
      delete bookData.id;
    }
    const result = await this.insertQueryToDatabase(sql, bookData);
    return result;
  }

  checkCorrectData(bookData) {
    if (typeof bookData.title !== 'string') {
      console.log(bookData.title);
      return false;
    }
    if (typeof bookData.author !== 'string') {
      console.log(bookData.author);
      return false;
    }
    if (typeof bookData.description !== 'string') {
      console.log(bookData.description);
      return false;
    }
    if (typeof bookData.image !== 'string') {
      console.log(bookData.image);
      return false;
    }
    return true;
  }

  checkCorrectColumn(column) {
    if (column === 'id') {
      return true;
    }
    if (column === 'title') {
      return true;
    }
    if (column === 'author') {
      return true;
    }
    if (column === 'description') {
      return true;
    }
    if (column === 'date') {
      return true;
    }
    if (column === 'image') {
      return true;
    }
    return false;
  }

  async updateBook(bookId, bookData) {
    const sql = `UPDATE books SET ? WHERE id = '${bookId}'`;
    if (bookData.date) {
      bookData.date = new Date(Date.parse(bookData.date));
    }
    if (bookData.id) {
      delete bookData.id;
    }
    const result = await this.insertQueryToDatabase(sql, bookData);
    return result;
  }

  async findAllBooks(orderBy, groupBy, page) {
    let sql = 'SELECT * FROM books ';
    if (orderBy) {
      if (!this.checkCorrectColumn(orderBy)){
        return false;
      }
      sql += `ORDER BY ${orderBy} `;
    }
    if (groupBy) {
      if (!this.checkCorrectColumn(groupBy)){
        return false;
      }
      sql = `SELECT MIN(id), ${groupBy} FROM books GROUP BY ${groupBy} `;
    }
    if (!isNaN(page)) {
      const offset = page * 50;
      sql += `LIMIT 50 OFFSET ${offset}`;
    } else {
      sql += `LIMIT 50`;
    }
    let result = await casher.getData(sql);
    if (result){
      return result;
    }
    result = await this.getQueryToDatabase(sql);
    await casher.setData(sql, JSON.stringify(result));
    return result;
  }

  async findOneBook(bookId) {
    const sql = `SELECT * FROM books WHERE id = '${bookId}'`;
    let result = await casher.getData(sql);
    if (result){
      return result;
    }
    result = await this.getQueryToDatabase(sql);
    await casher.setData(sql, JSON.stringify(result));
    return result;
  }
}

module.exports = new Book();
