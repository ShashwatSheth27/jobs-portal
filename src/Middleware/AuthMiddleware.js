import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthMiddleware({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {
        if(!authToken && location.pathname.startsWith('/dashboard')) navigate('/register');
        else if(authToken && (location.pathname.startsWith('/register'))) navigate('/dashboard/jobPost');
    }, [authToken, location, navigate]);

    return children;
}

export default AuthMiddleware;