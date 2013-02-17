
// Home Page
exports.index = function(req, res){
  console.log(req.param("billy"));
  res.render('index', { name: 'Now Templates are Working', val: req.param("billy") });
};

// Signup Page
exports.signup = require("./signup");
