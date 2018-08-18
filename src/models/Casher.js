const redis = require('redis');

const client = redis.createClient();


client.on('connect', () => {
  console.log('Подключение к Redis прошло успешно');
});


class Casher{
  async getData(sql) {
    return new Promise((resolve, reject) => {
      client.get(sql, (err, reply) => {
        if (err) {
          reject(err);
        }
        const data = JSON.parse(reply);
        resolve(data);
      });
    });
  }


  async setData(sql, data) {
    return new Promise((resolve, reject) => {
      client.set(sql, data, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }
}

module.exports = new Casher();
