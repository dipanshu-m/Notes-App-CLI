const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
  const notes = loadNotes();
  
  const duplicateNote =  notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note created!'));
  } else {
    console.log(chalk.red.inverse('Title already taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note Removed!'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse('No Note Found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your Notes!'));
  const noteTitles = notes.forEach((note) => {
    console.log(note.title);
  });
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const readNotes = (title) => {
  const notes = loadNotes();
  const noteSearch = notes.find((note)=> note.title === title);
  if (noteSearch){
    console.log(chalk.yellow.inverse(noteSearch.title));
    console.log(noteSearch.body);
  } else {
    console.log(chalk.red.inverse("No note found"))
  }

}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};
