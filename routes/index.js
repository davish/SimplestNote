
// Home Page
exports.index = function(req, res){
  console.log(req.param("billy"));
  res.render('notepad');
};

// Signup Page
exports.signup = require("./signup");
