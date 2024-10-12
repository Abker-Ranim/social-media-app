import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./AuthProvider";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      const socketInstance = io("http://localhost:5000", {
        query: {
          userId: auth._id,
        },
      });
      setSocket(socketInstance);
      socketInstance.on("getOnlineUsers", (users: any[]) => {
        setOnlineUsers(users);
      });
      return () => {
        socketInstance.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [auth]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
