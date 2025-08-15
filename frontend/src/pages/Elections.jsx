import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ElectionForm from '../components/ElectionForm';
import ElectionList from '../components/ElectionList';
import { useAuth } from '../context/AuthContext';

const Elections = () => {
  const { user } = useAuth();
  const [elections, setElections] = useState([]);
  const [editingElection, setEditingElection] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axiosInstance.get('/api/elections', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setElections(response.data);
      } catch (error) {
        alert('Failed to fetch elections.');
      }
    };

    fetchElections();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Election List</h1>
        {/**<Link to="/elections/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Elections
          </button>
        </Link>
        **/}
      </div>
  <ElectionForm
        elections={elections}
        setElections={setElections}
        editingElection={editingElection}
        setEditingElection={setEditingElection}
      />
      <ElectionList elections={elections} setElections={setElections} setEditingElection={setEditingElection} />
    </div>
  );
};

export default Elections;
