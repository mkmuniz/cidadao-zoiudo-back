import express from 'express';
import logger from 'morgan';
import router from './routes';

const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen((4000), () => {
    console.log(`Server is listening at ${4000}`);
});

export default app;