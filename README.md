# SimplestNote

---

***title. tag. save. pretty simple.***


SimplestNote is the simplest text editor/document storage service ever. It's build on node (my first project with it). No need to touch your mouse, or even the control key. Only eight little text commands to use it, plus two more to help you out. *note:* all commands (with the exception of list) must be typed on a new line. This is mostly so you're able to end sentences with words like 'save' and 'logout.'

- `login: [username] [pasword]`
  - lets you login to the service. 
  - note: the password will be visible while you're typing it, but if someone's looking over your shoulder, they can just as easily look at your keyboard as they can look at your screen.
- `list: [tag]`
  - List all documents on SimplestNote, use the `all` tag for all documents.
- `this.`
  - Type this command on the line of the file you want to open after calling `list`, and the file will be opened.
- `title: [title]`
  - adds a title to the document.
- `tag: [tag, tag, etc...]`
  - adds tags to a document.
- `save.`
  - Saves the document.
- `logout.`
  - pretty self-explanatory.
- `help.`
  - Shows the help for all the commands.
- `about.`
  - Don't really have to explain that one either.

---

## Credits
 The inspiration came after using a browser notepad from [this HN thread](http://news.ycombinator.com/item?id=5135194). The background and font colors came from [JacobIrwin](http://news.ycombinator.com/user?id=JacobIrwin)'s comment on that thread. After a few days taking notes with the offline textbox, I had some people sitting next to me asking what website that was. In addition, it got annoying having to copy/paste my notes from this fantastically simple note taker to Google Docs or Evernote. So, SimplestNote was born. I always wanted it to be simple, but originally was going to use keyboard shortcuts. Then I thought, why reach for the control key when you're already typing? And it's not a console at the bottom of the page either; it's inline. As simple as simple can get.
