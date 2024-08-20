import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken } from './user';

interface AppLoaderProps {
    children: ReactNode;
}

const AppLoader: React.FC<AppLoaderProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (!token && location.pathname !== '/login' && location.pathname !== '/signup') {
            navigate("/login");
        } else if (token && (location.pathname === '/login' || location.pathname === '/signup')) {
            navigate("/");
        }

        setLoading(false);
    }, [navigate, location.pathname]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return <>{children}</>;
};

export default AppLoader;
