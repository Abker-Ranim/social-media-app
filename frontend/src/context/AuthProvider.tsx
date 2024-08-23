import { createContext, useState, ReactNode, useContext } from "react";
import { User } from "../services/user";

interface AuthContextType {
    auth: User | undefined;
    setAuth: (auth: User | undefined) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<User | undefined>();

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
  
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
};
