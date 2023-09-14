import express from 'express';
import logger from 'morgan';
import router from './routes';
const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

export default app;