var MongoClient = require("mongodb").MongoClient;

exports.post = function (req, res) {
  console.log(req.body);
  var command = req.body.command;
  var ajaxResponse = {"command": req.body.command, "todo": ''}
  switch(command) {
    case "login":
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
