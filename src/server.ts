import http from 'https';
import app from './app';
const fs = require('fs');

let server = http.createServer(app);

const port = process.env.PORT;

server.listen(port, () => {
    return console.log(`Port listening at port ${port}`);
})