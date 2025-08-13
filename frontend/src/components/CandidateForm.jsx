import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../axiosConfig';

const CandidateForm = ({ candidates, setCandidates, editingCandidate, setEditingCandidate }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '', university:'' });

  useEffect(() => {
    if (editingCandidate) {
      setFormData({
        name: editingCandidate.name,
        description: editingCandidate.description,
        university: editingCandidate.university,
      });
    } else {
      setFormData({ name: '', description: '', university:'' });
    }
  }, [editingCandidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCandidate) {
        const response = await axiosInstance.put(`/api/candidates/${editingCandidate._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCandidates(candidates.map((candidates) => (candidates._id === response.data._id ? response.data : candidates)));
      } else {
        const response = await axiosInstance.post('/api/candidates', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCandidates([...candidates, response.data]);
      }
      setEditingCandidate(null);
      setFormData({ name: '', description: '', university: '' });
      navigate('/candidates')
    } catch (error) {
      alert('Failed to save candidates.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#dde6faff' }}className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingCandidate ? 'Edit the Candidate details' : 'Add a Candidate'}</h1>
      
      <input
        type="text"
        placeholder="Candidate Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="University"
        value={formData.university}
        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button 
      type="submit" 
      onClick={() => {
            navigate('/candidates');                        
          }}
      style={{ backgroundColor: '#002C5F' }}
      className="w-full bg-blue-600 text-white p-2 rounded">
        {editingCandidate ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default CandidateForm;
