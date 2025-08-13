const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    university: {type: String},
});

module.exports = mongoose.model('Candidate', candidateSchema);