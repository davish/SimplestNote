# SimplestNote

---

***title. tag. save. pretty simple.***


I've used some (effectively none) code from an abandoned project I started a few months ago, so some of the earliest commits might not make too much sense. 

SimplestNote is the simplest text editor ever. It's build on Node (my first project with it). No need to touch your mouse, or even the control key. Only eight little text commands to use it, plus two more to help you out. *note:* all commands (with the exception of list) must be typed on a new line. This is mostly so you're able to end sentences with words like 'save' and 'logout.'

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

todo:
- [check] implement commands with no arguments.
- [check] implement commands with multiple arguments (Regular Expressions)
- [check]      implement text-insertion, preferably no jQuery
- []      implement backend code
