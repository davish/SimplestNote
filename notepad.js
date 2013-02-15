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




// var todo = false;

var doc = ["troll"];

$(document).ready(function() {
  $("#txt").keyup(function(e) {
    var word = current_word('#txt');
    if (e.which == 190) {
      if (word == "save.") {
        removeCommand("save.", "txt");
        doc = $("#txt").val().split("\n");
        $("#txt").val(doc.join("\n"));
        console.log(doc);
    } else if (word == "logout.") {
        console.log("logged out");
      }
    }
    else if (e.which == 13) {
      doc.push(current_line($("#txt")));
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


