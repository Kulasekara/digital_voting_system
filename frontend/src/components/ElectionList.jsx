import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ElectionList = ({ elections, setElections, setEditingElection }) => {
  const { user } = useAuth();

  const handleDelete = async (electionId) => {
    try {
      await axiosInstance.delete(`/api/elections/${electionId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setElections(elections.filter((election) => election._id !== electionId));
    } catch (error) {
      alert('Failed to delete election.');
    }
  };

  return (
    <div>
      {elections.map((election) => (
        <div key={election._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{election.title}</h2>
          <p>{election.description}</p>
          <p className="text-sm text-gray-500">Deadline: {new Date(election.deadline).toLocaleDateString()}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingElection(election)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(election._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElectionList;
