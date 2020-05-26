// An array of all the notes
let Notes = [];
// arrays and json you can delcare const

// Check if a note is being edited
let edit_note = false;

// Variable which holds the current note which is being editing.
let note_being_edited;

// Clears the input field
function eraseField() {
  document.querySelector("#noteField").value = "";
}

// Saves the input field into a new note
function saveNote() {
  // Get the title field, note field and the saved note counter
  let text = document.querySelector("#noteField").value;
  let title = document.querySelector("#titleField").value;
  let notes_counter = document.querySelector("#counter");

  // Check if the save operation is allowed
  if (title === "") {
    alert("Title can't be empty");
  } else if (text === "") {
    alert("Note can't be empty");
  } else if (title.length > 40) {
    alert("Title can max contain 40 characters");
  } else if (text.length > 500) {
    alert("note text can max contain 500 characters");
  } else if (Notes.length >= 10) {
    alert("You can only have 10 notes");
  } else {
    switch (edit_note) {
      // Editing a note from our note array
      case true:
        editNote(note_being_edited.id, title, text, text.length);
        break;

      // Creating a new note and adding it to the note array
      case false:
        var noteid = Notes.length + 1;
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
        Notes.push(note);
        // update the counter
        notes_counter.innerHTML = Notes.length + "/10";
        // recreate the list so that the new note is showing.
        createSavedNotesList();
        console.log(Notes);
      default:
        break;
    }
  }
}

// Deletes the selected note
function deleteNote() {
  // get the saved note element
  let element = document.querySelector("#savedNotes");

  if (element.options[element.selectedIndex] == null) {
    alert("You need to select a note");
  } else {
    // get the selected index
    let value = element.options[element.selectedIndex].value;
    // looping through the note array and deletes the note which matches the id
    Notes.forEach((element) => {
      if (element.id == value) {
        Notes.splice(element, 1);
      }
    });
    // recreate the list so that we can see that the note has been deleted
    createSavedNotesList();
  }
}

// Opens the selected note
function openNote() {
  // get the saved note element
  let element = document.querySelector("#savedNotes");

  if (element.options[element.selectedIndex] == null) {
    alert("You need to select a note");
  } else {
    // get the selected index value
    let value = element.options[element.selectedIndex].value;
    // looping through the notes array and finds the note which matches the selected note
    Notes.forEach((element) => {
      if (element.id == value) {
        // when we find the correct note, we are in editing mode
        edit_note = true;
        note_being_edited = element;
        // sets the value of title and note field to the selected note value
        document.querySelector("#titleField").value = element.title;
        document.querySelector("#noteField").value = element.note;
        document.querySelector("#addNewNoteButton").classList.toggle("show");
      }
    });
  }
}

// Adds all the elements from our notes array to the select list.
function createSavedNotesList() {
  // get the element and empty it
  document.querySelector("#savedNotes").innerHTML = "";
  // loop through the array and create & add the notes to the select list.
  Notes.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.title;
    option.value = element.id;
    document.querySelector("#savedNotes").add(option, null);
  });
  // We save the notes array to local storage to keep data.
  localStorage.setItem("notes", JSON.stringify(Notes));
  // localStorage.notes = JSON.stringify(Notes)
}

// edit a note from our note array
function editNote(id, title, note, notelength) {
  Notes.forEach((element) => {
    if (element.id == id) {
      element.title = title;
      element.note = note;
      element.notelength = notelength;
      createSavedNotesList();
      alert("Note updated!");
    }
  });
}

// add new note
function addNewNote() {
  document.querySelector("#noteField").value = "";
  document.querySelector("#titleField").value = "";
  edit_note = false;
  note_being_edited = null;
  document.querySelector("#addNewNoteButton").classList.toggle("show");
  refreshCounter();
}

// sort by save date
function sortByDate() {
  Notes.sort(function (first, second) {
    let firstDate = first.date;
    let secondDate = second.date;

    if (firstDate < secondDate) {
      return -1;
    }
    if (firstDate > secondDate) {
      return 1;
    }
    // dates are equal
    return 0;
  });
  createSavedNotesList();
  console.log(Notes);
  printDates();
}

// sort by length
function sortByLength() {
  Notes.sort(function (first, second) {
    let firstLength = first.notelength;
    let secondLength = second.notelength;

    if (firstLength > secondLength) {
      return -1;
    }
    if (firstLength < secondLength) {
      return 1;
    }
    // notes length are equal
    return 0;
  });
  createSavedNotesList();
}

// sort by title
function sortByTitle() {
  Notes.sort(function (a, b) {
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  createSavedNotesList();
  console.log(Notes);
  printDates();
}

function refreshCounter() {
  let notes_counter = document.querySelector("#counter");
  notes_counter.innerHTML = Notes.length + "/10";
}

window.onload = function () {
  // get notes from local storage
  let notes = JSON.parse(localStorage.getItem("notes"));
  // if there is an array of notes, we set the global note array and create the select list
  if (notes) {
    Notes = notes;
    createSavedNotesList();
    refreshCounter();
  }
};

function printDates() {
  Notes.forEach((element) => {
    var date = new Date(element.date);
    console.log(date);
  });
}