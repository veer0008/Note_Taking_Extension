const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes' });
    }
};

exports.createNote = async (req, res) => {
    try {
        const newNote = new Note({
            content: req.body.content
        });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save note' });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true });
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update note' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note' });
    }
};
