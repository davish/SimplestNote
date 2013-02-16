function current_line(textarea) {
  var ta = document.getElementById(textarea),
      pos = ta.selectionStart;
      taval = ta.value;
      start = taval.lastIndexOf('\n', pos - 1) + 1,
      end = taval.indexOf('\n', pos);
  if (end == -1)
    end = taval.length;
  return taval.substr(start, end - start);
}

/*
  * Some conventions:
    * When a textarea is being passed into a function, it's always passed in as the string
    * of the area's id.
    * Textarea is always last argument of the function.
*/

var commandFuncs = {
  "save": {
    "update": function(ta) {
        doc = document.getElementById(ta).value.split("\n");
        document.getElementById.value = doc.join('\n');
    }
  },
  "util": {
    "insertAtLine": function(text, command, ta) {
      var lineNum = this.findLineNumber(ta);
      var taval = document.getElementById(ta).value;
      var whatToInsert = text.split('\n');

      // All this tempDoc shit is a horrible solution, just couldn't think of anything better.
      var tempDoc = taval.split("\n");

      for (var i = 0; i < whatToInsert.length; i++) {
        tempDoc.splice(i + lineNum, 0, whatToInsert[i]);
      }
      document.getElementById(ta).value = tempDoc.join("\n");
    },
    "findLineNumber": function(ta) {
      var taval = document.getElementById(ta);
      var lineCount = 0;
      for (var i = 0; i < taval.selectionStart; i++) {
        if (taval.value.charAt(i) == '\n')
          lineCount++;
      }
      return lineCount;
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

var TA = document.getElementById("txt");

  TA.onkeypress = function(e) {
    if (e.which == 13) {
      var found = current_line('txt').match(argRegEx);
      if (found != null) {
        commandFuncs.ajax.send({"command": found[1], "data": found[2].split(" ")});
      }
    }
  };
  TA.onkeyup = function(e) {
    var word = current_line('txt');
    // period
    if (e.which == 190) {
      if (word == "save.") {
        removeCommand(word, "txt");
        commandFuncs.save.update("txt");
        commandFuncs.ajax.send({"command": "save", "data": doc});
      } else if (word == "logout.") {
        console.log("logged out");
      } else if (word == "this.") {
        ;
      } else if (word == "help.") {
        commandFuncs.util.insertAtLine("This will be the help\nhelpint is my job", "txt");
      } else if (word == "about.") {
        commandFuncs.util.insertAtLine("about dbh937\nhe is cool.", "txt");
      } else if (word == "doc.") {
        console.log(doc);
        removeCommand(word, "txt");
      } else if (word == "clear.") {
        document.getElementById("txt").value = "";
        commandFuncs.save.update("txt");
      }
    } 

  };

function removeCommand(command, ta) { // Probably not the most well-named function, but it works.
  // removes the command string from the text area, so it doesn't get saved with everything else.
  var t = document.getElementById(ta);
  var where = t.selectionStart;
  var text = t.value;
  t.value = [text.slice(0, where - command.length - 1), text.slice(where + 1)].join('');
}