import { NOTES } from './data';

let notes = NOTES;
let nextId = 3;

export const getNotes = async () => {
    return [...notes];
}

export const createNote = async (noteData) => {
    const newNote = { _id: nextId++, ...noteData }
    notes.push(newNote);
    return { ...newNote };
}

export const updateNote = async (noteId, noteData) => {
    const noteIndex = notes.findIndex(n => n._id === noteId);
    const updatedNote = { _id: noteId, ...noteData };
    notes[noteIndex] = updatedNote;
    return { ...updatedNote };
}

export const deleteNote = async (noteId) => {
    notes = notes.filter(n => n._id !== noteId);
}