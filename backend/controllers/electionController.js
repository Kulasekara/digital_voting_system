
const Election = require('../models/Election');
const getElection = async (req, res) => {
try {
const elections = await Election.find({ userId: req.user.id });
res.json(elections);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const addElection = async (req, res) => {
const { title, description,start_date, deadline } = req.body;
try {
const election = await Election.create({ userId: req.user.id, title, description,start_date, deadline });
res.status(201).json(election);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const updateElection = async (req, res) => {
const { title, description, completed,start_date, deadline } = req.body;
try {
const election = await Election.findById(req.params.id);
if (!election) return res.status(404).json({ message: 'Election name not found' });
election.title = title || election.title;
election.description = description || election.description;
election.completed = completed ?? election.completed;
election.start_date = start_date || election.start_date;
election.deadline = deadline || election.deadline;
const updatedElection = await election.save();
res.json(updatedElection);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const deleteElection = async (req, res) => {
try {
const election = await Election.findById(req.params.id);
if (!election) return res.status(404).json({ message: 'Election name not found' });
await election.remove();
res.json({ message: 'Election deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};
module.exports = { getElection, addElection, updateElection, deleteElection };
