const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');

// Route 1 Get all notes login required
router.get("/fetchallnotes",fetchUser,async (req,res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }
    catch{
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Route 2 Add a new note login required
router.post("/addnote",fetchUser,[

    // express validator
    body('title', "Enter a valid email").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters.").isLength({ min: 5 })
],async (req,res)=>{

    // if validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {title, description, tag} = req.body;
    try{
        const note = new Note({title, description, tag, user: req.user.id});
        const saveNote = await note.save();
        res.json(saveNote);
    }
    catch{
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Route 3 Update a note login required
router.put("/updatenote/:id",fetchUser,async (req,res)=>{

    const {title, description, tag} = req.body;

    try{
        // Create a new note
        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

        // Find the note and update it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if((await note).user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json(note);
    }
    catch{
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// Route 4 Delete a note login required
router.delete("/deletenote/:id",fetchUser,async (req,res)=>{
    
    try{
        // Find the note and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if((await note).user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note deleted succesfully", note: note});
    }
    catch{
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;