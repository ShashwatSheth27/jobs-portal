import { useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Header from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import JobPost from './JobPost';
import Home from './Home';

function Dashboard() {
    const [username, setUsername] = useState(localStorage.getItem('authUser') || 'User');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        navigate('/register');
    };

    return (
        <div className='flex flex-col gap-7'>
            <Header username={username} onLogout={handleLogout} />
            <div className='flex border-t border-t-gray-300 min-h-screen'>
                <div className='flex flex-col w-20 border-r border-t-gray-300 p-6 mt-5'>
                    <FontAwesomeIcon icon={faHome} className="text-gray-600 cursor-pointer" size="lg" onClick={() => navigate('/dashboard/home')} />
                </div>
                <Routes>
                    <Route path="" element={<Navigate to="jobpost" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="jobpost" element={<JobPost />} />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;