# SimplestNote

---
*** title. tag. save. pretty simple. ***

***title. tag. save. pretty simple.***




This is just a little weekend projet I'll be working on this weekend. Had an idea for a smart notepad, but really no one has any use for it, so repurposed some of the idea for code in this project. It's the simplest text editor it's not even funny. And it's build on Node (my first project with it). No need to touch your mouse, or even the control key. Only eight little text commands.

- `login: [username] [pasword]`
  - lets you login to the service.
- `list: [tag]`
  - List all documents on SimplestNote, use the `all` tag for all documents.
- `this.`
  - Type this command on the line of the file you want to open after calling `list`, and the file will be opened.
- `title: [title]`
  - adds a title to the document.
- `tag: [tags]`
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
