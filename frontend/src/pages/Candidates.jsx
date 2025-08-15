import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import CandidateForm from '../components/CandidateForm';
import CandidateList from '../components/CandidateList';
import { useAuth } from '../context/AuthContext';

const Candidates = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [editingCandidate, setEditingCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axiosInstance.get('/candidates', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCandidates(response.data);
      } catch (error) {
        alert('Failed to fetch candidate.');
      }
    };

    fetchCandidates();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Candidate List</h1>
        
      </div>
  <CandidateForm
        candidates={candidates}
        setCandidates={setCandidates}
        editingCandidate={editingCandidate}
        setEditingCandidate={setEditingCandidate}
      />
      <CandidateList candidates={candidates} setCandidates={setCandidates} setEditingCandidate={setEditingCandidate} />
    </div>
  );
};

export default Candidates;
