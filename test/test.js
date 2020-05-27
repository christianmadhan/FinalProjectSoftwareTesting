const assert = require('chai').assert;
const crud = require('../Note-app/js/modules/crud-test');
const organize = require('../Note-app/js/modules/organize')
console.log(crud);
//--------------------------------------------------
// Daniel
// Save note test

// Delete note test

// Edit note test

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