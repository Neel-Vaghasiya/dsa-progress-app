import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SessionLoader = () => (
  <div className="flex h-screen items-center justify-center bg-gray-950">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-sky-500" />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <SessionLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default ProtectedRoute;
