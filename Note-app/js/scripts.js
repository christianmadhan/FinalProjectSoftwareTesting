import * as CRUD from './modules/crud.js';
import * as ORGANIZE from './modules/organize.js';

// Buttons
let saveBTN = document.querySelector('#saveButton');
let eraseBTN = document.querySelector('#eraseButton');
let deleteNoteBTN = document.querySelector('#deleteButton');
let openNoteBTN = document.querySelector('#openButton');
let addNewNoteBTN = document.querySelector("#addNewNoteButton");

// sort Buttons
let sort_by_dates = document.querySelector('#dateSortButton');
let sort_by_length = document.querySelector('#lengthSortButton');
let sort_by_title = document.querySelector('#titleSortButton');

// Text fields
let titlefield = document.querySelector("#titleField");
let notefield = document.querySelector("#noteField");

// Counter and saved note list
let notes_counter = document.querySelector("#counter");
let saved_notes_list = document.querySelector("#savedNotes");

// An array of all the notes
let Notes = [];
// arrays and json you can delcare const

// Check if a note is being edited
let edit_note = false;

// Variable which holds the current note which is being editing.
let note_being_edited;

// Clears the input field
eraseBTN.addEventListener('click', () => {
  notefield.value = "";
});


// Save note to array
saveBTN.addEventListener('click', () => {
    // Get the title field, note field and the saved note counter
    let note_text = notefield.value;
    let title_text = titlefield.value;
    let news_saved_notes_array = CRUD.saveNote(note_text, title_text, Notes, notes_counter, edit_note);
    let created =CRUD.createSavedNotesList(news_saved_notes_array);
    Notes = created;
});

deleteNoteBTN.addEventListener('click', () => {
  let selectedIndex = saved_notes_list.options[saved_notes_list.selectedIndex];
  
  if(selectedIndex == null){
    alert("You need to select a note");
  } else {
    let id = selectedIndex.value;
    let updated_note_array = CRUD.deleteNote(id, Notes);
    let created = CRUD.createSavedNotesList(updated_note_array);
    refreshCounter()
    Notes = created;
  }

  location.reload();
 });

 openNoteBTN.addEventListener('click', () => {
  let selectedIndex = saved_notes_list.options[saved_notes_list.selectedIndex];

  if(selectedIndex == null){
    alert("You need to select a note");
  } else {
    let id = selectedIndex.value;
    let note = CRUD.openNote(id, Notes);
    edit_note = true;
    note_being_edited = note;
    titlefield.value = note.title;
    notefield.value = note.note;
    addNewNoteBTN.classList.toggle("show");
  }
 });

 addNewNoteBTN.addEventListener('click', () => {
  let object = CRUD.addNewNote();
  titlefield.value = object.emptyTitle;
  notefield.value = object.emptyNoteField;
  edit_note = object.edit_note_status;
  note_being_edited = object.new_note_being_edited;
  addNewNoteBTN.classList.toggle("show");
 });

 sort_by_dates.addEventListener('click', () => {
    let sortedarray = ORGANIZE.sortByDate(Notes);
    let created = CRUD.createSavedNotesList(sortedarray);
    Notes = created;

 });

 sort_by_title.addEventListener('click', () => {
  let sortedarray = ORGANIZE.sortByTitle(Notes);
  let created = CRUD.createSavedNotesList(sortedarray);
  Notes = created;
});

sort_by_length.addEventListener('click', () => {
  let sortedarray = ORGANIZE.sortByLength(Notes);
  let created = CRUD.createSavedNotesList(sortedarray);
  Notes = created;
});



function refreshCounter() {
  notes_counter.innerHTML = Notes.length + "/10";
}

window.onload = function () {
  // get notes from local storage
  let notes = JSON.parse(localStorage.getItem("notes"));
  // if there is an array of notes, we set the global note array and create the select list
  if (notes) {
  let created = CRUD.createSavedNotesList(notes);
  Notes = created;
  let test = JSON.stringify(Notes);
  console.log(test)
  refreshCounter();
  }
};
