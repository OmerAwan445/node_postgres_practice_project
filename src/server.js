import Express from 'express';
import config from 'config';
import query from './db.js'

const app = Express();

console.log(config.get('db'), 'env var');
const port = config.get('server.port');

app.listen(port, () => {
    console.log("Server is running on port", port);
})

app.use('/',async (req, res)=> {
    await query('SELECT * FROM users').then((data) => {
        console.log(data.rows);
        res.send(data.rows);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
})

app.use(Express.json());