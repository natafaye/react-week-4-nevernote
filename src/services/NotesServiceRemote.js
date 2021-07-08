
const NOTES_ENDPOINT = 'https://crudcrud.com/api/60160ea878fe4ae4b53ed215f2fd8b64/notes';

const getFetchOptions = (method, data) => ({ 
    method: method, 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})

export const getNotes = async () => {
    try {
        const resp = await fetch(NOTES_ENDPOINT);
        return await resp.json();
    } 
    catch(e) {
        console.log(e);
        return null;
    }
}

export const createNote = async (noteData) => {
    try {
        const resp = await fetch(TODO_ENDPOINT, getFetchOptions("POST", noteData))
        return await resp.json();
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

export const updateNote = async (noteId, noteData) => {
    try {
        const resp = await fetch(NOTES_ENDPOINT + "/" + noteId, getFetchOptions("PUT", noteData));
        return resp;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

export const deleteNote = async (noteId) => {
    try {
        const resp = await fetch(NOTES_ENDPOINT + "/" + noteId, { method: "DELETE" })
        return resp;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}