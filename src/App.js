import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AuthMiddleware from './Middleware/AuthMiddleware';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AuthMiddleware><Navigate to="/Login" replace /></AuthMiddleware>} />
        <Route path="/login" element={<AuthMiddleware><Login /></AuthMiddleware>} />
        <Route path="/register" element={<AuthMiddleware><Register /></AuthMiddleware>} />
        <Route path="/dashboard/*" element={<AuthMiddleware><Dashboard /></AuthMiddleware>} />
      </Routes>
    </Router>
  );
}

export default App;