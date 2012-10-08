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

jQuery.fn.extend({
  insertAtCaret: function(myValue){
    return this.each(function(i) {
      if (document.selection) {
        //For browsers like Internet Explorer
        this.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        this.focus();
      }
      else if (this.selectionStart || this.selectionStart == '0') {
        //For browsers like Firefox and Webkit based
        var startPos = this.selectionStart;
        var endPos = this.selectionEnd;
        var scrollTop = this.scrollTop;
        this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
        this.focus();
        this.selectionStart = startPos + myValue.length;
        this.selectionEnd = startPos + myValue.length;
        this.scrollTop = scrollTop;
      } else {
        this.value += myValue;
        this.focus();
      }
    })
  }
});

var todo = false;

$(document).ready(function() {
  $("#txt").keypress(function(e) {
    if (e.which == 32) {
      if (current_line('#txt') == "todo:") {
        todo = true;
      }
    }
    else if (e.which == 13) {
      if(todo == true) {
        ln = current_line("#txt").substring(5, this.length);
        $('#todo').html($('#todo').html() + ln + '<br>'); 
        todo = false;
        console.log(ln);
      }
    }
  });
});

