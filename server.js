const express        = require('express'); // node module 
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})

//require('./routes')(app, {});
//app.get('/notes', (req, res) => {
    // You'll create your note here.
//    res.send('Hello World! \n')
//  });

//app.listen(port, () => {
//  console.log('We are live on ' + port);
//});

 // Split pain iterm
 // ngroc - command line tool 

