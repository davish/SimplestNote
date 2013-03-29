var mongoose = require('mongoose');

var Id = "";


var docSchema = new mongoose.Schema({
  title: String,
  tag: [String],
  user: String,
  content: [String]
});

var Document = mongoose.model('Document', docSchema);

exports.post = function (req, res) {
  console.log(req.body.command);
  var ajaxResponse = {"command": req.body.command, "todo": ''};
  switch(req.body.command) {
    case "login":
      break;
    case "signup":
      break;
    case "list":
      break;
    case "load":
      break;
    case "title":
      break;
    case "tag":
      break;
    case "save":
      // if (data.id) { // if there's an ID, i.e. if the file's already in the system
      //   createOrEditDoc(mongoose.Types.ObjectId.createFromHexString(data.id, req.body.data), req.body.data);
      // }
      // else {
        createOrEditDoc(req.body.data, res);
      // }
      break;
    case "logout":
      break;

  }
 
};

function sendToClient(res, ajaxResponse) {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(ajaxResponse));
}


function createOrEditDoc(data, res) {
  // takes the ID of a document and puts in the data, but only if it's different.
  // if `id` is null, then it creates a document.
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;

  db.once('open', function callback () {
    var doc;
    data.user = '';
    if (!data.id) { // if the id isn't defined, i.e. the document isn't in the database
      delete data.id;
      doc = new Document(data); // create a new document
    }
    else {
      delete data.id;
      doc = new Document(data); // for now it's the same.
    }

    doc.save(function(err) {
      if (!err) {
        mongoose.disconnect(function() {
          var Id = doc._id.toHexString();
          console.log(Id);
          data.id = Id;
          sendToClient(res, {"command": "save", "todo": "", "doc": data});
        });

      }

    });
  });

}