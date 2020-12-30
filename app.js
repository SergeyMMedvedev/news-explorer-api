const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/newsexplorerdb' } = process.env;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
});

app.listen(PORT);

app.use(requestLogger);

app.use(routes);

app.use('*', auth, (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errors());

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка на сервере'
      : message,
  });
  next();
});
