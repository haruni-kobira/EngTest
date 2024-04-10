const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dbURI = 'mongodb://HaruniEnginear:rgYv1%5BfE@cluster-cgi2dhciwlbr.ap-southeast-2.docdb.amazonaws.com:27017/docdb-nakamine';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false // 必要に応じて確認
});

const Cat = mongoose.model('Cat', { name: String });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/add', (req, res) => {
    const kitty = new Cat({ name: 'Ta' });
    kitty.save().then(() => console.log('meow'));
});

app.get('/find', async (req, res) => {
    const cats = await Cat.find();
    console.log(cats);
    res.send(cats);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
