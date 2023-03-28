import React, { useEffect, useRef, useState } from 'react'
import { Noteitems } from './Noteitems';
import { useContext } from 'react'
import { AppContext } from '../context/context'
import { useNavigate } from 'react-router-dom';


export const Notes = () => {

    const context = useContext(AppContext)
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", Etitle: " ", Edescription: " ", Etag: " " })
    let navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem('tokken')) {
            getNotes()
        }
        else {
         navigate('/Login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, Etitle: currentNote.title, Edescription: currentNote.description, Etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.Etitle, note.Edescription, note.Etag)
        refClose.current.click()

    }

    const handleOnChang = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Etitle" className="form-label">ETitle</label>
                                    <input type="text" className="form-control" id="Etitle" value={note.Etitle} name='Etitle' aria-describedby="emailHelp" onChange={handleOnChang} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Edescription" className="form-label">EDescription</label>
                                    <input type="text" className="form-control" id="Edescription" value={note.Edescription} name='Edescription' onChange={handleOnChang} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Etag" className="form-label">ETag</label>
                                    <input type="text" className="form-control" id="Etag" name='Etag' value={note.Etag} onChange={handleOnChang} />
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length === 0 && 'Note is note display'}
                {notes.map((note) => {
                    return <Noteitems key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}
