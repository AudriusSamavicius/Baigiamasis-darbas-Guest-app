const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

const Guest = mongoose.model("guest", guestSchema);

module.exports = Guest;
