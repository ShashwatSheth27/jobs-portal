import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AuthMiddleware from './Middleware/AuthMiddleware';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<AuthMiddleware><Register /></AuthMiddleware>} />
        <Route path="/dashboard/*" element={<AuthMiddleware><Dashboard /></AuthMiddleware>} />
      </Routes>
    </Router>
  );
}

export default App;