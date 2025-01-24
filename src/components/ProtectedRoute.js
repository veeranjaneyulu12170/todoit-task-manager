import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  // Check both Redux state and localStorage
  const userFromStorage = localStorage.getItem('user');
  const isUserAuthenticated = isAuthenticated || !!userFromStorage;

  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 