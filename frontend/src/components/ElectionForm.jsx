import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ElectionForm = ({ elections, setElections, editingElection, setEditingElection }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    if (editingElection) {
      setFormData({
        title: editingElection.title,
        description: editingElection.description,
        deadline: editingElection.deadline,
      });
    } else {
      setFormData({ title: '', description: '', deadline: '' });
    }
  }, [editingElection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingElection) {
        const response = await axiosInstance.put(`/api/elections/${editingElection._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setElections(elections.map((election) => (election._id === response.data._id ? response.data : election)));
      } else {
        const response = await axiosInstance.post('/api/elections', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setElections([...elections, response.data]);
      }
      setEditingElection(null);
      setFormData({ title: '', description: '', deadline: '' });
    } catch (error) {
      alert('Failed to save election.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingElection ? 'Your Form Name: Edit Operation' : 'Your Form Name: Create Operation'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingElection ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default ElectionForm;
