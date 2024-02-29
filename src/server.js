import Express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

const app = Express();

console.log(config.get('db.port'), 'env var');
const port = 3000;

app.listen(port, () => {
console.log("Server is running on port", port);
})

app.use(Express.json());