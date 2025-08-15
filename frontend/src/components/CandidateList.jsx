import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';


const CandidateList = ({ candidates, setCandidates, setEditingCandidate }) => {
  const { user } = useAuth();

  const handleDelete = async (candidateId) => {
    try {
      await axiosInstance.delete(`/candidates/${candidateId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCandidates(candidates.filter((candidate) => candidate._id !== candidateId));
    } catch (error) {
      alert('Failed to delete candidate.');
    }
  };

  return (
    <div>
      {candidates.map((candidate) => (
        <div key={candidate._id} className="bg-white-100 p-4 mb-4 rounded shadow">
          <div className="flex justify-between items-start" >
          <div>
          <h2 className="font-bold">Candidate Name: {candidate.name}</h2>
          <p>{candidate.description}</p>
          <p className="text-sm text-gray-500">University: {candidate.university}</p>
          </div>
          
         <div className="flex space-x-2">
            <button
              onClick={() => setEditingCandidate(candidate)}
              className="mr-2 text-black px-4 py-2 rounded border-2 border-blue-900"
            >
              Edit
            </button>
            
            <button
              onClick={() => handleDelete(candidate._id)}
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

export default CandidateList;
