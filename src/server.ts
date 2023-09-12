import https from 'http';
import app from './app';

let server = https.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
    return console.log(`Port listening at port ${port}`);
})