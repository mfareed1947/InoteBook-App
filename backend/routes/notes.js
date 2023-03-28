const express = require('express')
const router = express.Router();
const Note = require('../models/Note')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1 fetch all notes '/api/notes/fetchallnotes'. login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {

        console.log(error.message)
        res.status(500).send('some error oocured')
    }
})



//ROUTE 2 Add a new Notes using '/api/notes/fetchallnotes'. login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedData = await note.save()
        res.json(savedData)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('some error oocured')
    }
})



//ROUTE 3 Update Notes using '/api/notes/upadatenote'. login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a new note object
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("Not Allowed") }

    if (note.user.toString() !== req.user.id) { return res.status(401).send('Not Found') }
    // console.log(note.user)
    note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true })
    res.json({ note })
})

//ROUTE 4 delete Notes using '/api/notes/deletenote'. login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;