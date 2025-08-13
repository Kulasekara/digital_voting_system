import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Elections from './pages/Elections';
import Candidates from './pages/Candidates';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/candidates" element={<Candidates />} />

      </Routes>
    </Router>
  );
}

export default App;
