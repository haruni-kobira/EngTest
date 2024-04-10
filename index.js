const express = require('express');
const app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://cluster-cgi2dhciwlbr.ap-southeast-2.docdb.amazonaws.com:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false,
    user: 'HaruniEnginear',
    pass: 'rgYv1[fE',
    dbName: 'docdb-nakamine'
});

const Cat = mongoose.model('Cat', { name: String });

 
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/add', (req, res) => {
    const kitty = new Cat({ name: 'Ta' });
    kitty.save().then(() => console.log('meow'));
});

app.get('/find', (req, res) => {
    console.log(Cat.find());
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

// mongodb://HaruniEnginear:rgYv1[fE@docdb-nakamine.cluster-cgi2dhciwlbr.ap-southeast-2.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false



