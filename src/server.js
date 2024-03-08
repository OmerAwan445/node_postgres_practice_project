import express from 'express';
import config from 'config';
import { router } from './route.js';

const app = express();

console.log(config.get('db'), 'env var');
const port = config.get('server.port');

app.listen(port, () => {
  console.log('Server is running on port', port);
});

app.use((err, req, res, next)=>{
});


app.use('/api', router);

app.use(Express.json());
