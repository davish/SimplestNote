var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');


exports.post = function (req, res) {
  console.log(req.body);
  var command = req.body.command;
  var ajaxResponse = {"command": req.body.command, "todo": ''}
  switch(command) {
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
      break;
    case "logout":
      break;

  }
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(ajaxResponse));
};


function createOrEditDoc(name) {
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.once('open', function callback () {
    var docSchema = new Schema({
      title: String,
      tags: [String],
      id: Number,
      user: String,
      content: String
    });
  });
}