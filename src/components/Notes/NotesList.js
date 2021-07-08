import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { getNotes, createNote, updateNote, deleteNote } from '../../services/NotesServiceLocal';
import Note from './Note';

export default function NotesList({ startConfirm }) {
    const match = useRouteMatch();
    const history = useHistory();
    
	const [notes, setNotes] = useState([])

	const reloadNotes = async () => {
		const freshNotes = await getNotes();
		setNotes(freshNotes);
	}
	useEffect(() => {
		reloadNotes();
	}, [])

    const getNoteById = (noteId) => {
        return notes.find(n => n._id === noteId);
    }

	const handleCreateNote = async () => {
        const note = await createNote({ title: "New Note", text: ""});
        await reloadNotes();
        history.replace(`/notes/${note._id}/edit`);
	}

	const handleUpdateNote = async (note, newData) => {
		await updateNote(note._id, { ...newData, lastSaved: Date.now() });
		await reloadNotes();
        history.push(`/notes/${note._id}`);
	}

    const handleStartDeleteNote = (note) => {
        startConfirm(`Are you sure you want to delete ${note.title}?`, "Delete", () => handleDeleteNote(note))
    }

	const handleDeleteNote = async (note) => {
		await deleteNote(note._id);
		await reloadNotes();
        history.push(`/notes`);
	}

    return (
        <React.Fragment>
            <div className="sidebar inner-sidebar p-3">
                <div className="position-sticky pt-2">
                    <div className="d-grid">
                        <Button variant="warning" className="mb-3 float-end" onClick={handleCreateNote}>+ New Note</Button>
                    </div>
                    <Nav variant="pills" className="flex-column">
                        { notes.map(note => 
                            <Nav.Item key={note._id}>
                                <Nav.Link as={NavLink} to={`${match.url}/${note._id}`}>{note.title}</Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </div>
            </div>
            <div className="main inner-main px-2">
                <Switch>
                    <Route path={`${match.path}/:noteId`}>
                        <Note 
                            getNoteById={getNoteById} 
                            onUpdateNote={handleUpdateNote} 
                            onDeleteNote={handleStartDeleteNote} />
                    </Route>
                    <Route path={`${match.path}`}>
                        <p className="m-3 mt-5 text-center">Please select a note to view.</p>
                    </Route>
                </Switch>
            </div>
        </React.Fragment>
    )
}
