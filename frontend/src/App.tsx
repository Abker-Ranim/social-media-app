import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ProtectedRoute from './services/ProtectedRoute';
import { AuthProvider } from './services/AuthProvider';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login /> 
    },
    {
        path: '/signup',
        element: <Signup /> 
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ) 
    },
]);

const App: React.FC = () => {
    return (
        <AuthProvider >
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
