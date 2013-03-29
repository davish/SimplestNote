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
      doc.content = document.getElementById(ta).value.split("\n");
    },
    "redraw": function(ta) {
      document.getElementById(ta).value = doc.content.join('\n');
    },
    "setContent": function(str, ta) {
      doc.content = str.split("\n");
      this.redraw('txt');
    },
    "setDoc": function(d, ta) {
      doc = d;
      this.redraw('txt');
    }
  },
  "util": {
    "isTempDoc": false, 
    "insertAtLine": function(text, ta, c, useTempDoc) {
      if (c)
        funcs.util.removeFromLine(c, ta);
      funcs.save.update(ta);
      this.isTempDoc = useTempDoc;
      var lineNum = this.findLineNumber(ta) + 1;
      var taval = document.getElementById(ta).value;
      var whatToInsert = text.split('\n');


      if (useTempDoc) {
        var tempDoc = taval.split("\n");

        for (var i = 0; i < whatToInsert.length; i++) {
          tempDoc.splice(i + lineNum, 0, whatToInsert[i]);
        }
        document.getElementById(ta).value = tempDoc.join("\n");
      } else {
        for (var i = 0; i < whatToInsert.length; i++) {
          doc.content.splice(i + lineNum, 0, whatToInsert[i]);
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
    },
    "removeFromLine": function(command, ta) {
      // removes the command string from the text area, so it doesn't get saved with everything else.
      var t = document.getElementById(ta);
      var where = t.selectionStart;
      var text = t.value;
      t.value = [text.slice(0, where - command.length - 1), text.slice(where + 1)].join('');
    },
    "remove_line": function(ta) {
      doc.content.splice(funcs.util.findLineNumber(ta), 1);
    }
  },
  "ajax": {
    "send": function(data, command, toRemove) {

      if (toRemove) {
        funcs.util.removeFromLine(toRemove, 'txt')
      }     

      var commandReq = new XMLHttpRequest();
      commandReq.open("POST", "/command");
      commandReq.onload = function() { 
        var res = JSON.parse(this.responseText); 
        if (res.doc) {
          funcs.save.setDoc(res.doc, 'txt');
          console.log(doc);
        }
        if (res.todo)
          funcs.util.insertAtLine(res.todo, 'txt', false, false);
      };
      commandReq.setRequestHeader("Content-type", "application/json")
      var toSend = JSON.stringify(data);
      commandReq.send(toSend);
    },
  }
};

var strs = {
  "help": "Note: with the exception of `title:` and `tag:` commands, successful commands will dissapear, while if a command is unsuccessful, you will be prompted with the command again. \nFor example, if you did not enter the right password, `login:` will be shown again so you can enter the correct password.\nhere are the commands (type them on a new line):\n- help.\n\t- Shows the help for all the commands.\n- about.\n\t- learn more about the author of this wonderful webapp.\n- login: [username] [pasword]\n\t- lets you login to the service.\n\t- `logout.` does what you think it would.\n- signup: [username] [password]\n\t- signs up a user with the given username and password.\n- list: [tag]\n\t- List all documents accessable to you on SimplestNote, use the 'all' tag for all documents.\n\t- this.\n\t\t- Type this command on the same line of the file name you want to open to open the file.\n\t\t- example: \n\t\t\thi_world\n\t\t\tsecond_file this.\n\t\t\tthird_file\n\t\t- after hitting enter on the second line, second_file would be opened.\n- title: [title]\n\t- adds a title to the document. Note: Title can only be words can only be separated by underscores. no spaces.\n- tag: [tags]\n\t- adds tags to a document.\n- save.\n\t- Saves the document.\n",
  "about": "SimplestNote\n------------\ntitle. tag. save. pretty simple.\n\nSimplestNote was created by 14 year old Davis Haupt. You can check the project out on github[1], and if you really like it, you can donate[2]!\n[1]: https://github.com/dbh937/SimplestNote\n[2]: Bitcoin Address: 1MV7hQeuM1eDYKeiVLSmzvD8gGk9efXgTC\n-------\n",
  "typeToClear": "\n***Type any key to take this away***\n"
  //"both":  "SimplestNote\n------------\ntitle. tag. save. pretty simple.\n\nSimplestNote was created by 14 year old Davis Haupt. You can check the project out on github[1], and if you really like it, you can donate[2]!\n[1]: https://github.com/dbh937/SimplestNote\n[2]: Bitcoin Address: 1MV7hQeuM1eDYKeiVLSmzvD8gGk9efXgTC \n--------\nhere are the commands (type them on a new line):\n- help.\n\t- Shows the help for all the commands.\n- about.\n\t- learn more about the author of this wonderful webapp.\n- login: [username] [pasword]\n\t- lets you login to the service.\n\t- `logout.` does what you think it would.\n- list: [tag]\n\t- List all documents accessable to you on SimplestNote, use the 'all' tag for all documents.\n\t- this.\n\t\t- Type this command on the same line of the file name you want to open to open the file.\n\t\t- example: \n\t\t\thi_world\n\t\t\tsecond_file this.\n\t\t\tthird_file\n\t\t- after hitting enter on the second line, second_file would be opened.\n- title: [title]\n\t- adds a title to the document. Note: Title can only be words can only be separated by underscores. no spaces.\n- tag: [tags]\n\t- adds tags to a document.\n- save.\n\t- Saves the document.\n\ntype any key to remove the help.",

}

var doc = {"title": "", "tag": [], "content": [], "id": ""}

var argRegEx = /(login|signup|list|tag|title):\s([\w\d\s_]+)/;
var thisRegEx = /^([\w\d-]+)\sthis.$/;
var TA = document.getElementById("txt");

  TA.onkeypress = function(e) {
    if (e.which == 13) {
      var found = funcs.util.current_line('txt').match(argRegEx);
      if (found != null) {  // if it's any command w/ args
        var c;
        var d;
        if (found[1] == "title") { // title and tag alter the document
          doc[found[1]] = found.slice(2);
          c = "title";
          funcs.save.refresh("txt");
          d = doc;
        } 
        else if (found[1] == "tag") {
          doc["tag"] = found[2].split(' ');
          c = "tag"
          funcs.save.refresh("txt");
          d = doc;
        }
        else if (found[1] == "login" || found[1] == "list" || found[1] == "signup") { // list and login don't alter document
          funcs.util.removeFromLine(found[0], 'txt');
          c = found[1];
          d = found[2].split(" ");
        }
        funcs.ajax.send({"command": c, "data": d});
      }
    }
  };
  TA.onkeyup = function(e) {
    if (e.which == 190) {
      var word = funcs.util.current_line('txt');
      if (word == "save." || word == "s.") {
        funcs.util.removeFromLine(word, 'txt');
        funcs.save.refresh("txt");
        funcs.ajax.send({"command": "save", "data": doc});
      } 
      else if (word == "logout.") {
        funcs.util.removeFromLine(word, 'txt');
        funcs.ajax.send({"command": "logout", "data": null});
      } 
      else if (word == "help.") {
        funcs.util.insertAtLine(strs.help + strs.typeToClear, "txt", word, true);
      } 
      else if (word == "about.") {
        funcs.util.insertAtLine(strs.about + strs.typeToClear, "txt", word, true);
      } 
      else if (word == "clear.") {
        document.getElementById("txt").value = "";
        funcs.save.refresh("txt");
      } 
      else {
        var foundThis = funcs.util.current_line('txt').match(thisRegEx);
        if (foundThis != null) { // if it's the `this.` command
          funcs.save.setContent("");
          funcs.ajax.send({"command": "load", "data": foundThis[1]});
        }
      }
    } 
    else if (funcs.util.isTempDoc) {
      funcs.save.redraw("txt");
      funcs.util.isTempDoc = false;
    }

  };
