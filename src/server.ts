import http from 'https';
import app from './app';

let server = http.createServer(app);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    return console.log(`Port listening at port ${port}`);
});