import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { AuthProvider } from "./helpers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "./helpers/SocketContext";
import Profile from './pages/Profile/Profile';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <SocketContextProvider>
        <Toaster />
        <Outlet />
      </SocketContextProvider>
    </AuthProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:userId",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
