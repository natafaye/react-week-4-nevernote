import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function NoteForm({ note, onUpdateNote, onDeleteNote }) {
    const [titleValue, setTitleValue] = useState(note.title);
    const [textValue, setTextValue] = useState(note.text);
    const handleTitleChange = (e) => setTitleValue(e.target.value);
    const handleTextChange = (e) => setTextValue(e.target.value);

    const handleSave = () => {
        onUpdateNote(note, { title: titleValue, text: textValue });
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col d-flex">
                    <input type="text" 
                        className="form-control" 
                        value={titleValue} 
                        onChange={handleTitleChange} />
                    <Button variant="danger" className="ms-3" onClick={() => onDeleteNote(note)}>Delete</Button>
                    <Button variant="primary" className="ms-3" onClick={handleSave}>Save</Button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <textarea 
                        className="note-textarea form-control w-100 mt-3" 
                        onChange={handleTextChange}
                        value={textValue}/>
                </div>
            </div>
        </React.Fragment>
    )
}
