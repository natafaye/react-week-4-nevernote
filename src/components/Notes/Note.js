import React from 'react'
import { Switch, Route, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import NoteView from './NoteView';
import NoteForm from './NoteForm';

export default function Note({ getNoteById, onUpdateNote, onDeleteNote }) {
    const match = useRouteMatch();
    const { noteId } = useParams();

    const note = getNoteById(parseInt(noteId));
    
    return (
        <div className="container mt-3">
            { (!note) ? <Redirect to="/notfound"/> :
                <Switch>
                    <Route path={`${match.path}/edit`}>
                        <NoteForm key={note._id} note={note} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} />
                    </Route>
                    <Route path={`${match.path}`}>
                        <NoteView key={note._id} note={note} />
                    </Route>
                </Switch>
            }
        </div>
    )
}
