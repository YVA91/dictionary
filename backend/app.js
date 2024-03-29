require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limit');

const { NODE_ENV, DB_CONN } = process.env;

const { PORT = 3001 } = process.env;
const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://easy-word.ru', 'https://easy-word.ru, http://www.easy-word.ru, http://www.easy-word.ru'],
    credentials: true,
  }),
);
app.use(helmet());
app.use(requestLogger);
/*app.use(limiter);*/
app.use(cookieParser());
app.use(express.json());
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DB_CONN : 'mongodb://127.0.0.1:27017/worddb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
