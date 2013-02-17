/*
 * Login page, GET and POST
 */

var mongo = require("mongojs");

var db = mongo('test', ["users"]);

exports.get = function(req, res){
  res.render('login', { user: "", error: ""} );
};

exports.post = function(req, res){
  var user = (req.param("usr"));
  var psswd = (req.param("psswd"));
  var error = '';
  var er = 0;
  
  if (psswd != req.param("psswdConfirm")) {
    error = "Passwords don't match";
    er = 1;
  }
  else {
  db.users.find({"name": user}, function(err, result){
    if (!result.length) {
      error = "User Exists";
      er = 2;
    } else {
      db.users.save({"name": user, "password": psswd});
      console.log("user doesn't exist yet, creating user...");
    }
  });
  }
  console.log(er);
  res.render('login', {"user": user, "error": error});
};


