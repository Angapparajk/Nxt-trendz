import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookie.get('jwt_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
