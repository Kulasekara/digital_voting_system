const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    start_date: { type: Date },
    deadline: { type: Date },
});

module.exports = mongoose.model('Election', electionSchema);