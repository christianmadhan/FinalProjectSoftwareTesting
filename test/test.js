const assert = require('chai').assert;
const crud = require('../Note-app/js/modules/crud-test');
const dataprovider = require('./dataprovider.js');

// -----------------------------------------------------------------
//--------------------------------------------------
// Daniel
// Save note test

// Delete note test

// Edit note test

//--------------------------------------------------
// Christian
// Open note test
describe('Open note test', function() {
    it('open note should return a note object with the same id as the input id', function() {
        let result = crud.openNote(2, dataprovider.GOOD_NOTES);
        let note = dataprovider.GOOD_NOTES[1];
        assert.equal(result, note);
    });
    it('open note should fail, because wrong id is provided', function() {
      let result = crud.openNote(3, dataprovider.GOOD_NOTES);
      let note = dataprovider.GOOD_NOTES[1];
      assert.notEqual(result, note);
  });
});
// Erease note field test
describe('Erease note field test', function() {
   it('erease note field text should return an empty string if the string length is greater than 1', function() {
       let result = crud.ereaseNoteField('string greater than 1');
       assert.equal(result, "");
   });
   it('erease note field should fail, because empty string provided', function() {
      let result = crud.ereaseNoteField('');
      assert.notEqual(result, "");
 });

});

// Add new note test
describe('Add new note test', function() {
    it('add new note should not be equal to null', function() {
        let result = crud.addNewNote();
        assert.notEqual(result, null);
  });
 
 });

//--------------------------------------------------
// Kolesar

// Created saved notes list test

// Sort by date note test

//--------------------------------------------------
// Ando
// Sort by length note test

// Sort by title note test