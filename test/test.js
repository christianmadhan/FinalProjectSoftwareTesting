const assert = require('chai').assert;
const crud = require('../Note-app/js/modules/crud-test');
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
describe('Open note test', function() {
    it('open node should return a note object with the same id as the input id', function() {
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
// Sort by length note test

// Sort by title note test