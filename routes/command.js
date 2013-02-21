exports.post = function (req, res) {
  console.log(req.body.command);
  var command = req.body.command;

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
  var ajaxResponse = {"command": req.body.command, "todo": "gotta do this, now"}
  res.send(JSON.stringify(ajaxResponse));
};