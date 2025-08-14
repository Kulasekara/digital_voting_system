import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="text-white p-4 flex justify-between items-center"
    style={{ backgroundColor: '#002C5F' }}
    >
      <Link to="/" className="flex items-center text-2xl font-bold">
    <img
      src="/vote smart logo.png" 
      alt="Vote Smart Logo"
      className="h-20 w-50 mr-2 bg-white" 
    />Your Vote, Your Voice</Link>
      <div>
        {user ? (
          <>
            <Link to="/elections" className="mr-4">ELECTION</Link>
            <Link to="/profile" className="mr-4">PROFILE</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-white px-4 py-2 rounded hover:bg-blue-200 text-blue-900"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
