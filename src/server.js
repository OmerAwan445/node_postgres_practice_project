import express from 'express';
import { handler } from './Errors/ErrorHandler.js';
import { router } from './routers/index.js';
import { getEnv } from './utils/getEnv.js';
import cors from 'cors';
const app = express();

// Apply CORS middleware
app.use(cors());

// console.log(config.get('db'), 'env var');
const port = getEnv('server.port');

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.listen(port, () => {
  console.log('Server is running on port', port);
});


app.use('/api', router);
app.use('/api/test', (req, res) => {
  const reqCookies = req.cookies??['accessToken'];
  console.log(req.cookies);
  res.send({ reqCookies });
});


app.use((err, req, res, next)=>{
  handler.handleError(err, res);
});
