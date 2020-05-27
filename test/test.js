const assert = require('chai').assert;
const crud = require('../Note-app/js/modules/crud-test');
const organize = require('../Note-app/js/modules/organize')
console.log(crud);
//--------------------------------------------------
// Daniel
// Save note test
describe('Save note test #1', function(){
    it('should return the array of saved notes with the new one added', function(){
        let inputArray = new Array();
        let counterString = '';
        let outputArray = crud.saveNote('This is the note body', 'Cool title', inputArray, counterString, false);
        assert.equal(outputArray[0].id, 1);
        assert.equal(outputArray[0].title.toString(), 'Cool title');
        assert.equal(outputArray[0].note, 'This is the note body');
        assert.equal(outputArray[0].notelength, 21);
        // assert.equal(outputArray[0].date, Date.now());
    });
});

describe('Save note test #2', function(){
    it('should throw "Error: Empty String" because of the empty title', function(){
        let inputArray = new Array();
        let counterString = '';        
        try{
            (crud.saveNote('This is the note body', '', inputArray, counterString, false));
        }
        catch(err){
            assert.isNotOk(false);
        }
    });
});

describe('Save note test #3', function(){
    it('should throw "Error: Empty String" because of the empty body', function(){
        let inputArray = new Array();
        let counterString = '';        
        try{
            (crud.saveNote('', 'Cool title', inputArray, counterString, false));
        }
        catch(err){
            assert.isNotOk(false);
        }
    });
});

describe('Save note test #4', function(){
    it('should throw "Error: character limit reached" because of long title', function(){
        let inputArray = new Array();
        let counterString = '';        
        try{
            (crud.saveNote('This is the note body', '1234567890123456789012345678901234567890x', inputArray, counterString, false));
        }
        catch(err){
            assert.isNotOk(false);
        }
    });
});

describe('Save note test #5', function(){
    it('should throw "Error: character limit exteeded" because of the empty body', function(){
        let inputArray = new Array();
        let counterString = '';
        let noteBody = '';
        for (var i = 0; i < 50; i++) {
            noteBody += "1234567890x";
        }

        try{
            (crud.saveNote(noteBody, 'Cool title', inputArray, counterString, false));
        }
        catch(err){
            assert.isNotOk(false);
        }
    });
});

describe('Save note test #6', function(){
    it('should throw "Error: Maximum number of notes reached"', function(){
        let inputArray = new Array();
        let counterString = '';

        try{
            for (var i = 0; i < 11; i++) {
                crud.saveNote('This is the note body', 'Cool title', inputArray, counterString, false);
            }
        }
        catch(err){
            assert.isNotOk(false);
        }
    });
});


// Delete note test - FAILS BECAUSE MOCHA DOESN'T UNDERSTAND FILTER() FROM JS
// describe('Delete note test #1', function(){
//     it('should return the array of saved notes with the new one added', function(){
//         let inputArray = new Array();
//         let counterString = '';
//         crud.saveNote('This is the note body', 'Cool title', inputArray, counterString, false);
//         crud.saveNote('This is the note body', 'Cool title', inputArray, counterString, false);
//         inputArray = crud.deleteNote(0);
//         assert.equal(inputArray.length, 1);
//     });
// });


// Edit note test - FAILS BECAUSE MOCHA DOESN'T UNDERSTAND ALERT() FROM JS
// describe('Edit note test #1', function(){
//     it('should return the modified array', function(){
//         let inputArray = new Array();
//         let counterString = '';
//         crud.saveNote('This is the note body', 'Cool title', inputArray, counterString, false);
//         crud.saveNote('This is the note body', 'Cool title', inputArray, counterString, false);
//         inputArray = crud.editNote(0, 'new title', 'new body', 8, inputArray);
//         assert.equal(inputArray[0].title, 'new title');
//         assert.equal(inputArray[0].note, 'new body');
//     });
// });



//--------------------------------------------------
// Christian
// Open note test
describe('Open note test', function () {
    it('open node should return a note object with the same id as the input id', function () {
        let result = crud.openNote()
    });
});
// Erease note field test

// Add new note test

//--------------------------------------------------
// Kolesar

// Created saved notes list test

// Sort by date note test

//--------------------------------------------------
// Ando

const mediumNote = { id: 1, title: "medium", note: "Medium size note", notelength: 16, }
const shortNote = { id: 2, title: "short", note: "Short note", notelength: 10, }
const longNote = { id: 3, title: "long", note: "Way longer long note", notelength: 20, }

const notes = [mediumNote, shortNote, longNote]


// Sort by length note test
describe('Sort by length test', function () {
    it('Should sort the notes by length', function () {
        let isCorrect = true;
        let sortedNotes = organize.sortByLength(notes)
        let expected = [longNote, mediumNote, longNote]

        //assert.equal(expected[2], sortedNotes[2])
        //assert.equal(expected[3], sortedNotes[3])

        assert.deepEqual(expected[1], sortedNotes[1])
        assert.deepEqual(expected[3], sortedNotes[3])
        //assert.deepEqual(expected[2], sortedNotes[2])

    })
})


// Sort by title note test

const A = { id: 1, title: "A", note: "Medium size note", notelength: 16, }
const B = { id: 2, title: "B", note: "Short note", notelength: 10, }
const C = { id: 3, title: "C", note: "Way longer long note", notelength: 20, }

const notesToSortByTitle = { C, A, B }

describe('Sort by title test', function () {
    it('should sort the notes by title alphabetically', function () {
        let sorted = organize.sortByTitle(notesToSortByTitle)
        let expected = { A, B, C }

        assert.deepEqual(expected[1], sorted[1])
        assert.deepEqual(expected[2], sorted[2])
        assert.deepEqual(expected[3], sorted[3])
    })
})