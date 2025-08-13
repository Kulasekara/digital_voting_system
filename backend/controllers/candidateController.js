//	Admins add/edit/remove candidate profiles.

const Candidate = require('../models/Candidate');
const getCandidate = async (req, res) => {
try {
const candidates = await Candidate.find({ userId: req.user.id });
res.json(candidates);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const addCandidate = async (req, res) => {
const { name, description, university } = req.body;
try {
const candidate = await Candidate.create({ userId: req.user.id, name, description,university });
res.status(201).json(candidate);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const updateCandidate= async (req, res) => {
const { name, description, university } = req.body;
try {
const candidate = await Candidate.findById(req.params.id);
if (!candidate) return res.status(404).json({ message: 'Candidate name not found' });
candidate.name = name || candidate.name;
candidate.description = description || candidate.description;
candidate.university = university || candidate.university;
const updateCandidate = await candidate.save();
res.json(updateCandidate);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const deleteCandidate = async (req, res) => {
try {
const candidate = await Candidate.findById(req.params.id);
if (!candidate) return res.status(404).json({ message: 'Candidate name not found' });
await candidate.remove();
res.json({ message: 'Candidate deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};
module.exports = { getCandidate, addCandidate, updateCandidate, deleteCandidate };
