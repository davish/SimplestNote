
// Home Page
exports.index = function(req, res){
  console.log(req.param("billy"));
  res.render('notepad');
};

// Signup Page

exports.command = require("./command");