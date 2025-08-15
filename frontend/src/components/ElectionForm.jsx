import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../axiosConfig';

const ElectionForm = ({ elections, setElections, editingElection, setEditingElection }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', start_date:'', deadline: '' });

  useEffect(() => {
    if (editingElection) {
      setFormData({
        title: editingElection.title,
        description: editingElection.description,
        start_date: editingElection.start_date,
        deadline: editingElection.deadline,
      });
    } else {
      setFormData({ title: '', description: '',start_date:'', deadline: '' });
    }
  }, [editingElection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingElection) {
        const response = await axiosInstance.put(`/elections/${editingElection._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setElections(elections.map((election) => (election._id === response.data._id ? response.data : election)));
      } else {
        const response = await axiosInstance.post('/elections', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setElections([...elections, response.data]);
      }
      setEditingElection(null);
      setFormData({ title: '', description: '',start_date:'', deadline: '' });
      navigate('/elections')
    } catch (error) {
      alert('Failed to save election.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#dde6faff' }}className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingElection ? 'Edit the Election' : 'Create an Election'}</h1>
      {/**<button
          type="button"
          onClick={() => {
            setEditingElection?.(null);
            navigate('/elections');                        
          }}
          className="text-sm underline"
        >
          Cancel
        </button>**/}
      <input
        type="text"
        placeholder="Election Name"
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
        value={formData.start_date}
        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button 
      type="submit" 
      onClick={() => {
            navigate('/elections');                        
          }}
      style={{ backgroundColor: '#002C5F' }}
      className="w-full bg-blue-600 text-white p-2 rounded">
        {editingElection ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default ElectionForm;
