var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: String,
    body: String
});

//it's this "Note" that is referenced in Article.js
var Note = mongoose.model("Note", NoteSchema);

// if a tree falls in the forest and no one's around to hear it
// if a schema is made but never exported ...
module.exports = Note;