import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { Link } from 'react-router-dom';
//import { Link, useNavigate } from 'react-router-dom';


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
        <div key={election._id} className="bg-white-100 p-4 mb-4 rounded shadow">
          <div className="flex justify-between items-start" >
          <div>
          <h2 className="font-bold">Election Name: {election.title}</h2>
          <p>{election.description}</p>
          <p className="text-sm text-gray-500">Start Date {new Date(election.start_date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Deadline: {new Date(election.deadline).toLocaleDateString()}</p>
          </div>
          
         <div className="flex space-x-2">
            <button
              onClick={() => setEditingElection(election)}
              className="mr-2 text-black px-4 py-2 rounded border-2 border-blue-900"
            >
              Edit
            </button>
            <Link to="/candidates" className="mr-4"> 
          
            <button
            style={{ backgroundColor: '#002C5F' }}
              className="bg-gray-500 text-white px-4 py-2 rounded">
              Manage Candidate
            </button>
            </Link>
            <button
              onClick={() => handleDelete(election._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default ElectionList;
