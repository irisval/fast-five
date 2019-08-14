require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');


const ff = require('./routes/ff.route');
const app = express();
const mongoose = require('mongoose');



mongoose.connect(process.env.MLAB_URI, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use('/', ff);


const exphbs  = require('express-handlebars');

//when configuring the app view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: require('./public/js/helpers.js'), //only need this
  layoutsDir: './views',
  defaultLayout: 'layout',
  partialsDir: './views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', './views');



let port = process.env.PORT;


app.listen(port,function() {
	console.log('running on ' + port);
});


