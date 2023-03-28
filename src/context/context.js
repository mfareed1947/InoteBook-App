import { createContext } from "react";
import { useState } from "react";
const AppContext = createContext()

const AppProvider = ({ children }) => {

  const host = "http://localhost:5000"
  const notesIntial = []
  const [notes, setNotes] = useState(notesIntial)

  // Fetch all Notes
  const getNotes = async () => {
    // API Call TODO
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('tokken')
      },
    })
    const json = await response.json()
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    // API Call TODO
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('tokken')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json()
    setNotes(notes.concat(note))

  }
  // Delete Note
  const deleteNote = async (id) => {
    // API call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('tokken')
      },
    });
    const json = await response.text()  
    // delete note logic
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('tokken')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json)

    // edit logic 
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];

      if (element._id === id) {

        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }


  return <AppContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
    {children}
  </AppContext.Provider>
}

export { AppContext, AppProvider }