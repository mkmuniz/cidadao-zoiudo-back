import https from 'https';
import app from './app';

const fs = require('fs');

let server = https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key'),
}, app);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    return console.log(`Port listening at port ${port}`);
})