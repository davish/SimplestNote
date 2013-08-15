
var mongoose = require('mongoose');
var validate = require("validate");


var Id = "";


var docSchema = new mongoose.Schema({
  title: String,
  tag: [String],
  user: String,
  content: [String]
});

var userSchema = new mongoose.Schema({
  name: String,
  hash: String
});

var Document = mongoose.model('Document', docSchema);
var User = mongoose.model('User', userSchema);


exports.post = function (req, res) {
  switch(req.body.command) {
    case "login":
      break;
    case "signup":
      createNewUser(req.body.data[0], req.body.data[1], res);
      break;
    case "list":
      getListOfDocs(req.body.data, res, "");
      break;
    case "load":
      loadDoc(req.body.data, res, "");
      break;
    case "title":
      // N/a
      break;
    case "tag":
      // Nothing should go here...
      break;
    case "save":
        createOrEditDoc(req.body.data, res, ""); // Create a new document or just update an existing one
      break;
    case "logout":
      break;

  }
 
};


function createNewUser(name, pswd, res) {
  var passwordHash = validate.makePswdHash(name, pswd);

  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;

  db.once("open", function() {
    User.find({name: name}, function(err, docs) {
      if (!err) {
        if (docs[0] == undefined) {
          u = new User({"name": name, "hash": passwordHash});
          u.save(function(err) {
            if (!err) {
              mongoose.disconnect(function() {
                res.cookie("name", name, {signed: true});
                sendToClient(res, {})
              });
            } else {
              mongoose.disconnect();
            }
          });
        } else {
          mongoose.disconnect(function() {
            sendToClient(res, {"command": "signup", "todo": "signup: "});
          });
        }
      } else {
        console.log(err);
      }
    }); 
  });
  
}


// ajaxResponse = {"command": req.body.command, "todo": [text to insert], "doc": [new/updated document]};
function sendToClient(res, ajaxResponse) {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(ajaxResponse));
}


function loadDoc(f, res, user) {

  mongoose.connect("mongodb://localhost/test");
  var db = mongoose.connection;

  db.once('open', function() {
    Document.findOne({"title": f, "user": ""}, function(err, doc) {
      if (!err) {
        sendToClient(res, {"command": "load", "todo": "", "doc": {"id": doc._id, 
                                                                "title": doc.title, 
                                                                "tag": doc.tag, 
                                                                "content": doc.content}
                                                              });
      }
      mongoose.disconnect();
    });
  });

}

function getListOfDocs(data, res, user) {
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.once('open', function() {
    Document.find({"user": user}, function(err, docs) {
      var l = []
      for (var i = 0; i < docs.length; i++) {
        l[i] = docs[i].title;
      }
      sendToClient(res, {"command": "list", "todo": l.join("\n")});

      mongoose.disconnect();
    });
  });
}


function createOrEditDoc(data, res, user) {
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
          mongoose.disconnect(function() {
            sendToClient(res, {"command": "save", "todo": "", "doc": data});
          });
        }
      });

    }
    else {
      data.user = user;
      doc = new Document(data); // for now it's the same.
      doc.save(function(err) {
        if (!err) {
          mongoose.disconnect(function() {
            var Id = doc._id.toHexString();
            data.id = Id;
            sendToClient(res, {"command": "save", "todo": "", "doc": data});
          });
        } else {
          mongoose.disconnect();
        }
      });
    }
  });

}