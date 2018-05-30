// Questions: 
// How do I distinguish between put, get, delete and post in the terminal with curl
// Why are the text and title fields null in mLab

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + 'deleted!');
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    console.log("_id: " + req.params.id + "\n");
    console.log("text: " + req.body.body);
    console.log("title " + req.body.title);
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });


  //const collection = 
	app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    console.log("body: " + req.body.body + ", title: " + req.body.title);
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        console.log(result);
        res.send(result.ops[0]);
      }
    });
  });
};

//function insert (thing, callBack){
//  console.log("writing " + thing + " to the database.");
//  callBack(undefined, thing)
//}



