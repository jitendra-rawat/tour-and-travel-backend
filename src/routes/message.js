import express from 'express';
import Message from '../models/message.js'


const router = express.Router();





//  create a new message

router.post('/post-message', async (req, res) => {
    try {
        const { name, email, mobileNumber, message } = req.body;
        const newMessage = new Message({ name, email, mobileNumber, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// retrieve all messages
router.get('/get-message', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// to delete a message by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.json({ message: "Message deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;

