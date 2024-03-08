import express from 'express';
import config from 'config';
import { router } from './routers/index.js';
import { handler } from './Errors/ErrorHandler.js';

const app = express();

// console.log(config.get('db'), 'env var');
const port = config.get('server.port');

app.listen(port, () => {
  console.log('Server is running on port', port);
});


app.use('/api', router);

app.use(express.json());

app.use((err, req, res, next)=>{
  handler.handleError(err, res);
});