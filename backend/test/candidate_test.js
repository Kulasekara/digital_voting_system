const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server'); 
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Candidate = require('../models/Candidate');
const { getCandidate, addCandidate, updateCandidate, deleteCandidate } = require('../controllers/candidateController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;


describe('AddCandidate Function Test', () => {

  it('should create a new candidate successfully', async () => {
    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { name: "New Candidate", description: "Candidate description",university: "University" }
    };

    // Mock Candidate that would be created
    const createdCandidate = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };

    // Stub Candidate.create to return the createdCandidate
    const createStub = sinon.stub(Candidate, 'create').resolves(createdCandidate);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addCandidate(req, res);

    // Assertions
    expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdCandidate)).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Candidate.create to throw an error
    const createStub = sinon.stub(Candidate, 'create').throws(new Error('DB Error'));

    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { name: "New Candidate", description: "Candidate description",university: "University" }
    };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addCandidate(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

});


describe('Update Function Test', () => {

  it('should update candidate successfully', async () => {
    // Mock Candidate data
    const candidateId = new mongoose.Types.ObjectId();
    const existingCandidate = {
      _id: candidateId,
      name: "Old Candidate",
      description: "Old Description",
      university: "Old University",
      save: sinon.stub().resolvesThis(), // Mock save method
    };
    // Stub Candidate.findById to return mock Candidate
    const findByIdStub = sinon.stub(Candidate, 'findById').resolves(existingCandidate);

    // Mock request & response
    const req = {
      params: { id: candidateId },
      body: { name: "New Candidate"}
    };
    const res = {
      json: sinon.spy(), 
      status: sinon.stub().returnsThis()
    };

    // Call function
    await updateCandidate(req, res);

    // Assertions
    expect(existingCandidate.name).to.equal("New Candidate");
    expect(res.status.called).to.be.false; // No error status should be set
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });



  it('should return 404 if candidate is not found', async () => {
    const findByIdStub = sinon.stub(Candidate, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await updateCandidate(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Candidate name not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Candidate, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await updateCandidate(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
  });



});

describe('GetCandidate Function Test', () => {

  it('should return candidate for the given user', async () => {
    // Mock user ID
    const userId = new mongoose.Types.ObjectId();

    // Mock Candidate data
    const candidates= [
      { _id: new mongoose.Types.ObjectId(), name: "Candidate 1", userId },
      { _id: new mongoose.Types.ObjectId(), name: "Candidate 2", userId }
    ];

    // Stub Candidate.find to return mock Candidate
    const findStub = sinon.stub(Candidate, 'find').resolves(candidates);

    // Mock request & response
    const req = { user: { id: userId } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getCandidate(req, res);

    // Assertions
    expect(findStub.calledOnceWith({ userId })).to.be.true;
    expect(res.json.calledWith(candidates)).to.be.true;
    expect(res.status.called).to.be.false; // No error status should be set

    // Restore stubbed methods
    findStub.restore();
  });

  it('should return 500 on error', async () => {
    // Stub Candidate.find to throw an error
    const findStub = sinon.stub(Candidate, 'find').throws(new Error('DB Error'));

    // Mock request & response
    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getCandidate(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findStub.restore();
  });

});



describe('DeleteCandidate Function Test', () => {

  it('should delete a candidate successfully', async () => {
    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock Candidate found in the database
    const candidate = { remove: sinon.stub().resolves() };

    // Stub Candidate.findById to return the mock Candidate
    const findByIdStub = sinon.stub(Candidate, 'findById').resolves(candidate);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call function
    await deleteCandidate(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(candidate.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Candidate deleted' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 404 if candidate is not found', async () => {
    // Stub Candidate.findById to return null
    const findByIdStub = sinon.stub(Candidate, 'findById').resolves(null);

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call function
    await deleteCandidate(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Candidate name not found' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Candidate.findById to throw an error
    const findByIdStub = sinon.stub(Candidate, 'findById').throws(new Error('DB Error'));

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call function
    await deleteCandidate(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

});