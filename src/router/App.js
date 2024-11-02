import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ProfileDetails from '../pages/ProfileDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/ProfileDetails"
              element={<PrivateRoute><ProfileDetails /></PrivateRoute>}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
