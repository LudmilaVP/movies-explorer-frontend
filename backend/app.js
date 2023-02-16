require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const rateLimiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { signupValidator, signinValidator } = require('./validators/validators');
const { createUser, login, signout } = require('./controllers/users');
const corsOption = require('./middlewares/cors');

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsOption));
app.use(helmet());
app.use(rateLimiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.get('/signout', signout);
app.post('/signup', signupValidator, createUser);
app.post('/signin', signinValidator, login);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect(DATABASE_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
