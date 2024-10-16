import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/user";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const loggedIn: boolean = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate, loggedIn]);

  return children;
}
