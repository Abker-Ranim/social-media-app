import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { AuthProvider } from "./helpers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "./helpers/SocketContext";
import Profile from "./pages/Profile/Profile";
import MainLayout from "./pages/MainLayout/MainLayout";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <SocketContextProvider>
        <Toaster />
        <MainLayout />
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
