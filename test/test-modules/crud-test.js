module.exports = {
    // Saves the input field into a new note
    saveNote: function(text, title, note_array, counter, check_edit_note) {

    // Check if the save operation is allowed
    if (title === "") {
      alert("Title can't be empty");
      throw "Error: Empty String";
    
    } else if (text === "") {
      alert("Note can't be empty");
      throw "Error: Empty String";
    
    } else if (title.length > 40) {
      alert("Title can max contain 40 characters");
      throw "Error: character limit reached";

    } else if (text.length > 500) {
      alert("note text can max contain 500 characters");
      throw "Error: character limit exteeded ";

    } else if (note_array.length >= 10) {
      alert("You can only have 10 notes");
      throw "Error: Maximum number of notes reached";

    } else {
      switch (check_edit_note) {
        // Editing a note from our note array
        case true:
       let updatedNotesArray =   editNote(note_being_edited.id, title, text, text.length, note_array);
       return updatedNotesArray;

        // Creating a new note and adding it to the note array
        case false:
          var noteid = note_array.length + 1;
          var notelength = text.length;
          var date = Date.now();
          var note = {
            id: noteid,
            title: title,
            note: text,
            notelength: notelength,
            date: date,
          };
          // add the note to the array
          note_array.push(note)
          // update the counter
          counter.innerHTML = note_array.length + "/10";
          console.log(note_array);
          return note_array;
        default:
          break;
      }
    }
    return note_array;
  },


  // Deletes the selected note
deleteNote: function(note_id, note_array) {
      // looping through the note array and delete the note which matches the id
       let newarray = note_array.filter((item) => item.id !== note_id);
      return newarray;
},





  // edit a note from our note array
editNote: function(id, title, note, notelength, note_array) {
  let arr = note_array;
  console.log(note_array);
  arr.forEach((element) => {
    if (element.id == id) {
      console.log(element.id + ": ÆFOUND");
      element.title = title;
      element.note = note;
      element.notelength = notelength;
      element.date = Date.now()
    }
  });
  return JSON.stringify(arr);
},

// Opens the selected note
openNote: function(id, note_array) {
  let note_to_return;
  note_array.forEach((note) => {
    if(id == note.id){
      note_to_return = note;
    }
  });
  return note_to_return;
},

// add new note
addNewNote: function() {
  let addNewNoteObject = {
    emptyTitle: "",
    emptyNoteField : "",
    edit_note_status: false,
    new_note_being_edited: null
  };
  return addNewNoteObject;
},

ereaseNoteField: function(note_text) {
  return note_text.length > 1 ? "" : -1;
}

}