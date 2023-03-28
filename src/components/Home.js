import React from 'react'
import { AddNote } from './AddNote'
import { Notes } from './Notes'

const Home = () => {
  return (
    <div className='container my3'>
      <h2>Add a Note</h2>
      <AddNote/>
      <Notes/>
    </div>
  )
}

export default Home

