import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/context'

export const Noteitems = (props) => {
    const context = useContext(AppContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (

        <div className="col-md-3">
            <div className='card my-3'>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <ion-icon name="create-outline" onClick={() => { updateNote(note) }}></ion-icon>
                    <ion-icon name="trash-outline" onClick={() => deleteNote(note._id)} ></ion-icon>
                </div>
            </div>
        </div>
    )
}
