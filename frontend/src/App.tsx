import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ProtectedRoute from './services/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';

export const App: React.FC = () => {
    return (
        <AuthProvider >
            <Toaster />
            <Outlet />
        </AuthProvider>
    );
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <Login /> 
            },
            {
                path: 'signup',
                element: <Signup /> 
            },
            {
                path: '',
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ) 
            },
        ]
    }
]);