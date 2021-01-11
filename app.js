const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/limiter');
const { MONGO_URL } = require('./utils/mongo-config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
});

app.use(cors());

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
