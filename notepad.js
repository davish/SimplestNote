
/*
  * Some conventions:
    * When a textarea is being passed into a function, it's always passed in as the string
    * of the area's id.
*/

var funcs = {
  "save": {
    "refresh": function(ta) {
      this.update(ta);
      this.redraw(ta);
    },
    "update": function(ta) {
      doc = document.getElementById(ta).value.split("\n");
    },
    "redraw": function(ta) {
      document.getElementById(ta).value = doc.join('\n');
    }
  },
  "util": {
    "isTempDoc": false, 
    "insertAtLine": function(text, ta, c, useTempDoc) {
      removeCommand(c, ta);
      funcs.save.update(ta);
      this.isTempDoc = useTempDoc;
      var lineNum = this.findLineNumber(ta);
      var taval = document.getElementById(ta).value;
      var whatToInsert = text.split('\n');


      // All this tempDoc shit is a horrible solution, just couldn't think of anything better.
      if (useTempDoc) {
        var tempDoc = taval.split("\n");

        for (var i = 0; i < whatToInsert.length; i++) {
          tempDoc.splice(i + lineNum, 0, whatToInsert[i]);
        }
        document.getElementById(ta).value = tempDoc.join("\n");
      } else {
        for (var i = 0; i < whatToInsert.length; i++) {
          doc.splice(i + lineNum, 0, whatToInsert[i]);
        }
        funcs.save.redraw("txt");
      }
    },
    "findLineNumber": function(ta) {
      var taval = document.getElementById(ta);
      var lineCount = 0;
      for (var i = 0; i < taval.selectionStart; i++) {
        if (taval.value.charAt(i) == '\n')
          lineCount++;
      }
      return lineCount;
    },
    "current_line": function(textarea) {
      var ta = document.getElementById(textarea),
        pos = ta.selectionStart;
        taval = ta.value;
        start = taval.lastIndexOf('\n', pos - 1) + 1,
        end = taval.indexOf('\n', pos);
      if (end == -1)
        end = taval.length;
      return taval.substr(start, end - start);
    }
  },
  "ajax": {
    "send": function(data) {
      console.log(data); // TODO: write backend code
      if(data.command == "list")
        return ["doc1", "doc 2", "doc three"];
    }
  }
};

var strs = {
  "help": "here are the commands:\n - login: [username] [pasword]\n\t- lets you login to the service.\n- list: [tag]\n\t- List all documents accessable to you on SimplestNote, use the 'all' tag for all documents.\n- this.\n\t- Type this command on the line of the file you want to open after calling list, and the file will be opened.\n- title: [title]\n\t- adds a title to the document.\n- tag: [tags]\n\t- adds tags to a document.\n- save.\n\t- Saves the document.\n- logout.\n\t- pretty self-explanatory.\n- help.\n\t- Shows the help for all the commands.\n- about.\n\t- Don't really have to explain that one either.\npress space to remove the help.",
  "about": "SimplestNote\n------------\ntitle. tag. save. pretty simple.\n\nSimplestNote was created by 14 year old Davis Haupt. You can check the project out on github[1], and if you really like it, you can donate[2]!\n[1]: https://github.com/dbh937/SimplestNote\n[2]: insert paypal here.\npress space to make this go away."
}

var doc = [];

var argRegEx = /(login|list|tag|title):\s([\w\d\s]+)/;

var TA = document.getElementById("txt");

  TA.onkeypress = function(e) {
    if (e.which == 13) {
      var found = funcs.util.current_line('txt').match(argRegEx);
      if (found != null) {
        funcs.ajax.send({"command": found[1], "data": found[2].split(" ")});
      }

    }
  };
  TA.onkeyup = function(e) {
    var word = funcs.util.current_line('txt');
    // period
    if (e.which == 190) {
      if (word == "save.") {
        removeCommand(word, "txt");
        funcs.save.refresh("txt");
        funcs.ajax.send({"command": "save", "data": doc});
      } else if (word == "logout.") {
        funcs.ajax.send("logged out");
      } else if (word == "this.") {
        console.log("this!");
      } else if (word == "help.") {
        funcs.util.insertAtLine(strs.help, "txt", word, true);
      } else if (word == "about.") {
        funcs.util.insertAtLine(strs.about, "txt", word, true);
      } else if (word == "doc.") {
        console.log(doc);
        removeCommand(word, "txt");
      } else if (word == "clear.") {
        document.getElementById("txt").value = "";
        funcs.save.refresh("txt");
      }
    } else if (e.which == 32 && funcs.util.isTempDoc) {
      funcs.save.redraw("txt");
      funcs.util.isTempDoc = false;
    } 

  };

function removeCommand(command, ta) { // Probably not the most well-named function, but it works.
  // removes the command string from the text area, so it doesn't get saved with everything else.
  var t = document.getElementById(ta);
  var where = t.selectionStart;
  var text = t.value;
  t.value = [text.slice(0, where - command.length - 1), text.slice(where + 1)].join('');
}