import Express from 'express';
import config from 'config';

const app = Express();

console.log(config.get('db'), 'env var');
const port = config.get('server.port');

app.listen(port, () => {
console.log("Server is running on port", port);
})

app.use(Express.json());