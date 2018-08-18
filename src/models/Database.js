const connection = require('../config/connectToDatabase');


class Database {

  constructor(){
    this.dataConstruct();
  }

  async dataConstruct(){
    const result = await this.checkTableExist('books');
    if (!result) {
      await this.createTable();
      await this.feelTable10e5();
    }
  }

  getQueryToDatabase(sql, data) {
    return new Promise((resolve, reject) => {
      connection.query(sql, data, (error, results) => {
        if (error) {
          console.log(error);
          resolve(false);
        }
        if (results[0]) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }


  async checkTableExist(tableName) {
    const sql = `SHOW TABLES LIKE '${tableName}'`;
    const result = await this.getQueryToDatabase(sql);
    if (result){
      console.log('таблица существует');
    } else {
      console.log('таблица не существует');
    }
    return result;
  }

  async createTable() {
    const sql = 'CREATE TABLE IF NOT EXISTS books ('
        + 'id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,'
        + 'title VARCHAR(100),'
        + 'date DATE,'
        + 'author VARCHAR(50),'
        + 'description TEXT,'
        + 'image VARCHAR(50)'
        + ');';
    let result = await this.getQueryToDatabase(sql);
    return result;
  }

  generateAuthor() {
    const firstNames = [
      'Владимир',
      'Александр',
      'Павел',
      'Сергей',
      'Виталий',
      'Вячеслав',
      'Борис',
      'Никита',
      'Дмитрий',
      'Евгений',
      'Игорь',
      'Станислав',
      'Федор'];

    const surnames = [
      'Петров',
      'Сидоров',
      'Малахов',
      'Акунин',
      'Достоевский',
      'Лермонтов',
      'Пушкин',
      'Маяковский',
      'Толстой',
      'Михалков',
      'Остер',
      'Толкиен',
    ];

    const secondNames = [
      'Вячеслалович',
      'Петрович',
      'Александрович',
      'Игоревич',
      'Сергеевич',
      'Михайлович',
      'Владимирович',
      'Николаевич',
      'Станислалович',
      'Никитович',
    ];

    const author = `${surnames[Math.floor(Math.random() * 12)]
    } ${firstNames[Math.floor(Math.random() * 13)]
    } ${secondNames[Math.floor(Math.random() * 10)]}`;
    return author;
  }


  generateDescription() {
    const dictionary = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
    const numberOfWords = Math.floor(Math.random() * 10);
    let description = '';
    for (let i = 0; i < numberOfWords; i++) {
      description = `${description} ${dictionary[Math.floor(Math.random() * 5)]}`;
    }
    return description;
  }

  generateImage() {
    const arrayOfImages = ['images/54.svg',
      'images/1.svg',
      'images/2.svg',
      'images/3.svg',
      'images/4.svg',
      'images/5.svg',
      'images/6.svg',
      'images/7.svg'];

    const image = arrayOfImages[Math.floor(Math.random() * 8)];

    return image;
  }

  async generateStroke(numberOfStroke) {
    const stroke = {
      title: `title${numberOfStroke}`,
      date: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
      description: this.generateDescription(),
      author: this.generateAuthor(),
      image: this.generateImage(),
    };

    return stroke;
  }

  async saveStroke(stroke) {
    const sql = 'INSERT INTO books SET ? ';
    let result = await this.getQueryToDatabase(sql, stroke);
    return result;
  }

  async feelTable10e5() {
    const start = new Date();
    for (let i = 0; i < 100000; i++) {
      const stroke = await this.generateStroke(i + 1);
      await this.saveStroke(stroke);
      if (i % 100 === 0) {
        console.log(`Сохранено ${i} строк`);
      }
    }
    console.log('Сохранено 100000 строк');
    const time = new Date() - start;
    console.log(`Таблица заполнена за ${time} ms`);
  }
}


module.exports = new Database();
