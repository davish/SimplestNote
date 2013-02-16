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


var doc = [];

var argRegEx = /(login|list|tag|title): (\w+|\d+)+ ?(\w+|\d+)*/;
$(document).ready(function() {
  $("#txt").keyup(function(e) {
    var word = current_word('#txt');
    // period
    if (e.which == 190) {
      if (word == "save.") {
        removeCommand("save.", "txt");
        doc = $("#txt").val().split("\n");
        $("#txt").val(doc.join("\n"));
        console.log(doc);
      } else if (word == "logout.") {
        console.log("logged out");
      } else if (word == "this.") {

      } else if (word == "help.") {

      } else if (word == "about.") {

      }
    } 
    // colon
    else if (e.which == 186) {

    } 
    // space
    else if (e.which == 32) {

    } 
    // \n
    else if (e.which == 13) {

    }
  });
});

function removeCommand(command, ta) {
  var t = document.getElementById(ta);
  var where = t.selectionStart;
  var text = $("#" + ta).val();
  var newText = [text.slice(0, where - command.length - 1), text.slice(where + 1)].join('');
  $("#" + ta).val(newText);
}


