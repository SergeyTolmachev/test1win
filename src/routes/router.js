const Router = require('koa-router');
const router = new Router();
const bookController = require('../controllers/bookController');


router.get('/book', bookController.getAllBooks);

router.get('/book/:bookId', bookController.getBook);

router.post('/book', bookController.createBook);


router.update('/book?:dookId', bookController.updateBook);


// router.put('/book/:bookId', bookController.updateBook);

module.exports = router;


console.log('test');
