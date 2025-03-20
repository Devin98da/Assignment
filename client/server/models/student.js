const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
}, { timestamps: true });


module.exports = mongoose.model("Student", StudentSchema);