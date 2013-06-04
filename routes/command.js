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
      // N/a
      break;
    case "tag":
      // Nothing should go here...
      break;
    case "save":
        createOrEditDoc(req.body.data, res); // Create a new document or just update an existing one
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
    if (data.id) { // if the document exists
      Document.findByIdAndUpdate(data.id, data, function(err, doc) {
        if (!err) {
          console.log("updated!");
          mongoose.disconnect(function() {
            sendToClient(res, {"command": "save", "todo": "", "doc": data});
          });
        }
      });

    }
    else {
      doc = new Document(data); // for now it's the same.
      doc.save(function(err) {
        if (!err) {
          mongoose.disconnect(function() {
            var Id = doc._id.toHexString();
            data.id = Id;
            sendToClient(res, {"command": "save", "todo": "", "doc": data});
          });
        }
      });
    }
  });

}