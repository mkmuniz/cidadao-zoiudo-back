import express from 'express';
import logger from 'morgan';
import router from './routes';

const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(cors({origin: 'https://webscraper-front-vied.vercel.app'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

export default app;