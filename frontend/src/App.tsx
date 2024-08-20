import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import AppLoader from './services/apploader';

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
        element: <AppLoader><Home /></AppLoader> 
    },
]);

const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
