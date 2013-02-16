function current_line(textarea) {
  var $ta = $(textarea),
      pos = $ta.getSelection().start,
      taval = $ta.val(),
      start = taval.lastIndexOf('\n', pos - 1) + 1
      end = taval.indexOf('\n', pos);
  if (end == -1) {
    end = taval.length;
  }

  return taval.substr(start, end-start);
}
function current_word(textarea) {
  var $ta = $(textarea),
      pos = $ta.getSelection().start,
      taval = $ta.val(),
      start = taval.lastIndexOf('\n', pos - 1) + 1
      end = taval.indexOf(' ', pos);
  if (end == -1) {
    end = taval.length;
  }

  return taval.substr(start, end-start);
}



/*
  * Some conventions:
    * When a textarea is being passed into a function, it's always passed in as the string
    * of the area's id.
*/

var commandFuncs = {
  "save": {
    "update": function(ta) {
        doc = $("#" + ta).val().split("\n");
        $("#" + ta).val(doc.join("\n"));
    }
  },
  "util": {
    "insertAtLine": function(line, ta) {
      ; // pass for now
    }
  },
  "ajax": {
    "send": function(data) {
      console.log(data); // TODO: write backend code
    }
  }
};

var doc = [];

var argRegEx = /(login|list|tag|title):\s([\w\d\s]+)/;


$(document).ready(function() {
  $("#txt").keypress(function(e) {
    if (e.which == 13) {
      var found = current_line('#txt').match(argRegEx);
      if (found != null) {
        commandFuncs.ajax.send({"command": found[1], "data": found[2].split(" ")});
      }
    }
  });
  $("#txt").keyup(function(e) {
    var word = current_word('#txt');
    // period
    if (e.which == 190) {
      if (word == "save.") {
        removeCommand(word, "txt");
        commandFuncs.save.update("txt");
        commandFuncs.ajax.send({"command": "save", "data": doc});
      } else if (word == "logout.") {
        console.log("logged out");
      } else if (word == "this.") {

      } else if (word == "help.") {

      } else if (word == "about.") {

      } else if (word == "doc.") {
        console.log(doc);
        removeCommand(word, "txt");
      }
    } 
    // colon
    else if (e.which == 186) {

    } 
    // space
    else if (e.which == 32) {

    } 
  });


});

function removeCommand(command, ta) { // Probably not the most well-named function, but it works.
  // removes the command string from the text area, so it doesn't get saved with everything else.
  var t = document.getElementById(ta);
  var where = t.selectionStart;
  var text = $("#" + ta).val();
  var newText = [text.slice(0, where - command.length - 1), text.slice(where + 1)].join('');
  $("#" + ta).val(newText);
}




