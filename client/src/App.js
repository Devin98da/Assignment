import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Fix import
import { useSelector } from 'react-redux';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NoRoute from './Pages/NoRoute';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';
import AuthRedirect from './Components/AuthRedirect';
import Students from './Components/Students';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  const isAdminLoggedIn = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAdminLoggedIn ? "/admin/dashboard" : "/login"} replace />} />

        <Route path="/login" element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        } />
        <Route path="/register" element={
          <AuthRedirect>
            <Register />
          </AuthRedirect>
        } />

        <Route element={<ProtectedRoute />} >
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='students' element={<Students />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NoRoute />} />
      </Routes>
    </Router >
  );
}

export default App;
