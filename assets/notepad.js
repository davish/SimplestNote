var strs = {
  "help": "here are the commands:\n- list: [tag]\n\t- List all documents accessable to you on SimplestNote, use the 'all' tag for all documents.\n- this.\n\t- Type this command on the line of the file you want to open after calling list, and the file will be opened.\n- title: [title]\n\t- adds a title to the document. Note: title can only be one word.\n- tag: [tags]\n\t- adds tags to a document.\n- save.\n\t- Saves the document.\n- help.\n\t- Shows the help for all the commands.\n- about.\n\t- Don't really have to explain that one.\npress any key to remove the help.",
  "about": "SimplestNote\n------------\ntitle. tag. save. pretty simple.\n\nSimplestNote was created by Davis Haupt. You can check the project out on github[1], and if you really like it, you can donate[2]!\n[1]: https://github.com/dbh937/SimplestNote\n[2]: BTC: 1MV7hQeuM1eDYKeiVLSmzvD8gGk9efXgTC \npress any key to make this go away."
}

var doc = { 
            "title": "", 
            "tags": [], 
            "content": []
          }; // The document object.

var temp = false;

var ta = document.getElementById("txt");

var argRegEx = /(list|tag|title):\s([\w\d\s-]+)/; // matches the command keywords, a space and then any combo of letters, numbers, and dashes. Spaces separate args.
var thisRegEx = /^([\w\d-]+)\sthis.$/;

ta.onkeypress = function(e) {
  if (e.which == 13) { // Return key pressed
    var found = getCurrentLineVal('txt').match(argRegEx);
    if (found != null) { // if line matches for the list, tag or title commands
      
      if (found[1] == "title") {
        doc.title = found[2].split(" ")[0]; // First argument of the title command
      } 
      else if (found[1] == "tag") {
        doc.tags.concat(found[2].split(" "));
      } 
      else if (found[1] == "list") {
        if (found[2] == "all") {
          // TODO: display list of files
        } else {
          // TODO: implement sorting by tags
        }
      }
    } else {
      var foundThis = getCurrentLineVal('txt').match(thisRegEx);
      if (foundThis != null) {
        var fileName = foundThis[1];
        // Do something with filename to open the file.
      }
    }

  }
};
ta.onkeyup = function(e) {
  if (e.which == 190) {
    var word = getCurrentLineVal();
    if (word == "save.") {
      removeStrFromCurrentPosition(word);
      updateDoc();
    } 
    else if (word == "help.") {
      ta.value = strs.help;
      temp = true;
    } 
    else if (word == "about.") {
      ta.value = strs.about;
      temp = true;
    } 
  } 
  else if (temp) { // If key pressed when the about or help screens are up
    // put the regular document back.
    redrawTA();
    temp = false;
  } 
};


function updateDoc() {
  // modify the doc object to reflect what is in the textarea
  doc.content = ta.value.split("\n");
}

function redrawTA() {
  // modify the textarea to reflect the 'doc' object
  ta.value = doc.content.join('\n');
}

function insertAtLine(text) {
  var lineNum = getLineNumber(ta);
  var taval = ta.value;
  var whatToInsert = text.split('\n');

  for (var i = 0; i < whatToInsert.length; i++) {
    doc.splice(i + lineNum, 0, whatToInsert[i]);
  }
  save.redraw("txt");
}

function getLineNumber() {
  var cursor = ta.selectionStart;
  var taval = ta;
  var lineCount = 0;

  for (var i = 0; i < taval.selectionStart; i++) {
    if (ta.charAt(i) == '\n')
      lineCount++;
  }
  return lineCount;
}

function getCurrentLineVal() {
  // returns the value of the line where the cursor is located

  var pos = ta.selectionStart;
  var taval = ta.value;
  var start = taval.lastIndexOf('\n', pos - 1) + 1,
   end = taval.indexOf('\n', pos);
  
  if (end == -1)
    end = taval.length;
  return taval.substr(start, end - start);
}

function removeStrFromCurrentPosition(s) {
  var where = ta.selectionStart;
  var text = ta.value;
  ta.value = [text.slice(0, where - s.length - 1), text.slice(where + 1)].join('');
}