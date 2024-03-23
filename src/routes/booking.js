import express from 'express'
import Booking from '../models/booking.js'

const router = express.Router()




// POST route to create a new booking
router.post('/post-bookings', async (req, res) => {
    try {
        const { name, mobileNumber, email, date, tourName ,numberOfPeople} = req.body;
        const newBooking = new Booking({ name, mobileNumber, email, date, tourName,numberOfPeople });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET  all bookings
router.get('/get-bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  delete a booking by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json({ message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;