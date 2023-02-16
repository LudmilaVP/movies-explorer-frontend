const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.use(auth, usersRouter);
router.use(auth, moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});
module.exports = router;
