
// Home Page
exports.index = function(req, res){
  console.log(req.param("billy"));
  res.render('notepad');
};

exports.command = require("./command");