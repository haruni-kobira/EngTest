const express = require('express');
const app = express();
const Redis = require('ioredis');
const cfenv = require('cfenv');


// Redis
const client = new Redis({
  host: 'nakamine-cache.gpddhc.clustercfg.apse2.cache.amazonaws.com', // rename the credentials `hostname` to `host`
  port: 6379,
  password: null,
});




// 接続先
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/add', async (req, res) => {
    res.send('Add');
    await client.set('Book', 'BooBook');
    // const kitty = new Cat({ name: 'Ta' });
    // kitty.save().then(() => console.log('meow'));
});

app.get('/find', async (req, res) => {
    var response = await client.get('Book');
    res.send(response);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
