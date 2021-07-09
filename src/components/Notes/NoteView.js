import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useRouteMatch } from 'react-router-dom';

export default function NoteView({ note }) {
    const match = useRouteMatch();

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h2>{note.title}</h2>
                </div>
                <div className="col-3">
                    <Button variant="warning" as={Link} to={match.url + "/edit"} className="float-end">Edit</Button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="note-text-display mt-2">{note.text}</p>
                </div>
            </div>
        </React.Fragment>
    )
}
