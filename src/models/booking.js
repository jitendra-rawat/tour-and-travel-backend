import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberOfPeople: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tourName: {
        type: String,
        required: true
    },

});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking
