require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const ff = require('./routes/ff.route');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MLAB_URI, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));
app.use('/', ff);

hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');
app.set('views', './views');

let port = process.env.PORT;


app.listen(port,function() {
	console.log('running on ' + port);
});


