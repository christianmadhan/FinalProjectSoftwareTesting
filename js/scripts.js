// An array of all the notes
var Notes = [];

// Check if a note is being edited
var edit_note = false;

// Variable which holds the current note which is being editing.
var note_being_edited;

// Clears the input field
function eraseField(){
    document.getElementById("noteField").value = "";
}

// Saves the input field into a new note
function saveNote(){

    // Get the title field, note field and the saved note counter
    var text = document.getElementById("noteField").value;
    var title = document.getElementById("titleField").value;
    var notes_counter = document.getElementById("counter");

    // Check if the save operation is allowed
    if(title === "") {
        alert("Title can't be empty");
    } else if(text === "") {
        alert("Note can't be empty");
    } else if(title.length > 40) {
        alert("Title can max contain 40 characters");
    } else if(text.length > 500) {
        alert('note text can max contain 500 characters');
    } else if(Notes.length >= 10){
        alert('You can only have 10 notes')
    } else {


        switch (edit_note) {
          // Editing a note from our note array
            case true:
                editNote(note_being_edited.id, title, text);
                break;
            
          // Creating a new note and adding it to the note array
            case false:
                var noteid = Notes.length;
                var note = {
                    'id': noteid,
                    'title': title,
                    'note': text
                }
                // add the note to the array
                Notes.push(note);
                // update the counter
                notes_counter.innerHTML = Notes.length + '/10';
                // recreate the list so that the new note is showing.
                createSavedNotesList();
            default:
                break;
        }
    }
}

// Deletes the selected note
function deleteNote(){
    // get the saved note element
    var element = document.getElementById('savedNotes');
    // get the selected index
    var value = element.options[element.selectedIndex].value;
    // looping through the note array and deletes the note which matches the id
    Notes.forEach(element => {
        if(element.id == value){
            Notes.splice(element, 1);
        }
    });
    // recreate the list so that we can see that the note has been deleted
    createSavedNotesList();
}

// Opens the selected note
function openNote(){
    // get the saved note element
    var element = document.getElementById('savedNotes');
    // get the selected index
    var value = element.options[element.selectedIndex].value;
    
    // looping through the notes array and finds the note which matches the selected note
    Notes.forEach(element => {
        if(element.id == value){
            // when we find the correct note, we are in editing mode
            edit_note = true;
            note_being_edited = element;
            // sets the value of title and note field to the selected note value
            document.getElementById("titleField").value = element.title
            document.getElementById("noteField").value = element.note
            document.getElementById('addNewNoteButton').classList.toggle('show');
        }
    });
}

// Adds all the elements from our notes array to the select list.
function createSavedNotesList(){
    // get the element and empty it
    document.querySelector('#savedNotes').innerHTML = '';
    // loop through the array and create & add the notes to the select list.
    Notes.forEach(element => {
        var option = document.createElement('option');
        option.text = element.title;
        option.value = element.id;
        document.querySelector('#savedNotes').add(option, null);
    });
    // We save the notes array to local storage to keep data.
    localStorage.setItem('notes',JSON.stringify(Notes));
}

// edit a note from our note array
function editNote(id, title, note) {
    Notes.forEach(element => {
        if(element.id == id){
            element.title = title
            element.note = note
            createSavedNotesList();
            alert('Note updated!');
        }
    })
}

// add new note
function addNewNote(){
    document.getElementById("noteField").value = '';
    document.getElementById("titleField").value = '';
    edit_note = false;
    note_being_edited = null;
    document.getElementById('addNewNoteButton').classList.toggle('show');
    this.refreshCounter();
}

// sort by save date
function sortByDate(){

}

// sort by length
function sortByLength(){

}

// sort by title
function sortByTitle(){
    // Notes.sort();   ---> this would sort the list alphabetically
    // (I think it fails, because it contains objects and not clear strings
    // + something might be wrong with how the notes are stored, because deletion doesn't work properly sometimes)
}

function refreshCounter(){
    var notes_counter = document.getElementById("counter").value;
    notes_counter.innerHTML = Notes.length + '/10';
}

window.onload = function() {
   // get notes from local storage
   var notes = JSON.parse(localStorage.getItem('notes'));
   // if there is an array of notes, we set the global note array and create the select list
   if(notes){
       this.Notes = notes;
       this.createSavedNotesList();      
       this.refreshCounter(); 
   }
}