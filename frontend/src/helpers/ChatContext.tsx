import React, { createContext, useState, useContext, ReactNode } from "react";

interface ChatContextProps {
  showChat: boolean;
  chatUser: any;
  setShowChat: (value: boolean) => void;
  setChatUser: (value: any) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showChat, setShowChat] = useState(true);
  const [chatUser, setChatUser] = useState<any>(null);

  return (
    <ChatContext.Provider
      value={{ showChat, chatUser, setShowChat, setChatUser }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
