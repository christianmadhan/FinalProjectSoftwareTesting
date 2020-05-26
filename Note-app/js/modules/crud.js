// Saves the input field into a new note
export function saveNote(text, title, note_array, counter, check_edit_note) {

    // Check if the save operation is allowed
    if (title === "") {
      alert("Title can't be empty");
    } else if (text === "") {
      alert("Note can't be empty");
    } else if (title.length > 40) {
      alert("Title can max contain 40 characters");
    } else if (text.length > 500) {
      alert("note text can max contain 500 characters");
    } else if (note_array.length >= 10) {
      alert("You can only have 10 notes");
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
  }


  // Deletes the selected note
export function deleteNote(note_id, note_array) {
      // looping through the note array and delete the note which matches the id
       let newarray = note_array.filter((item) => item.id != note_id);
      return newarray;
}

// Adds all the elements from our notes array to the select list.
export function createSavedNotesList(note_array) {
    // get the element and empty it
    document.querySelector("#savedNotes").innerHTML = "";
    // loop through the array and create & add the notes to the select list.
    note_array.forEach((element) => {
      var option = document.createElement("option");
      option.text = element.title;
      option.value = element.id;
      document.querySelector("#savedNotes").add(option, null);
    });
    // We save the notes array to local storage to keep data.
    localStorage.setItem("notes", JSON.stringify(note_array));
    // localStorage.notes = JSON.stringify(Notes)
    return note_array;
  }



  // edit a note from our note array
export function editNote(id, title, note, notelength, note_array) {
  note_array.forEach((element) => {
    if (element.id == id) {
      element.title = title;
      element.note = note;
      element.notelength = notelength;
    }
  });
  alert("Note updated!");
  return note_array;
}

// Opens the selected note
export function openNote(id, note_array) {
  let note_to_return;
  note_array.forEach((note) => {
    if(id == note.id){
      note_to_return = note;
    }
  });
  return note_to_return;
}

// add new note
export function addNewNote() {
  let addNewNoteObject = {
    emptyTitle: "",
    emptyNoteField : "",
    edit_note_status: false,
    new_note_being_edited: null
  };
  return addNewNoteObject;
}
