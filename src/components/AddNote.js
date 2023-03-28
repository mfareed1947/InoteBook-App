import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/context'

export const AddNote = () => {
    const context = useContext(AppContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: " ", description: " ", tag: " " })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote( {title: " ", description: " ", tag: " "})
    }

    const handleOnChang = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title'value={note.title} required aria-describedby="emailHelp" onChange={handleOnChang} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description'value={note.description} required onChange={handleOnChang} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" name='tag'value={note.tag} required onChange={handleOnChang} />
                </div>
                
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
            </form>
        </div>
    )
}
