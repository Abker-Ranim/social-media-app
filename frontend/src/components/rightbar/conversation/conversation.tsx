import { useState, useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { sendMessage, Message as MessageType } from "../../../services/message";
import { useAuth } from "../../../helpers/AuthProvider";
import toast from "react-hot-toast";
import { getConversation } from "../../../services/conversation";
import { useSocketContext } from "../../../helpers/SocketContext";
import "./conversation.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

interface props {
  user: any;
  closeChat: () => void;
  handleBack: () => void;
}

const Conversation = ({ user, closeChat, handleBack }: props) => {
  const { auth } = useAuth();
  const { socket, onlineUsers } = useSocketContext();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<any>(null);

  const receiverId = user?._id;
  const isOnline = onlineUsers.some((user) => user === receiverId);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(newMessage);
      if (newMessage.senderId === receiverId)
        setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);

  useEffect(() => {
    socket?.on("typing", (receiver, sender) => {
      if (receiver === auth?._id && sender == user?._id) setIsTyping(true);
    });

    socket?.on("stopTyping", (receiver, sender) => {
      if (receiver === auth?._id && sender == user?._id) setIsTyping(false);
    });

    return () => {
      socket?.off("typing");
      socket?.off("stopTyping");
    };
  }, [socket, setIsTyping]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getConversation(receiverId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        toast.error("Failed to load messages.");
      }
    };

    fetchMessages();
  }, []);

  const handleMessageChange = (e: any) => {
    setNewMessageContent(e.target.value);
    if (e.target.value.trim() !== "") {
      socket?.emit("typing", receiverId, auth?._id);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        socket?.emit("stopTyping", receiverId, auth?._id);
      }, 1000);
    }
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (newMessageContent.trim() !== "") {
      try {
        const response = await sendMessage(newMessageContent, receiverId);
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, response]);
        setNewMessageContent("");
        socket?.emit("stopTyping", receiverId, auth?._id);
      } catch (error) {
        toast.error("Error sending message. Please try again later.");
        console.error("Failed to send message:", error);
      }
    } else {
      console.warn("Message content is empty");
    }
  };

  return (
    <>
      <div className="chat-header">
        <IoMdArrowRoundBack className="return" onClick={handleBack} />

        <div className="username">
          <h3>{user?.firstName + " " + user?.lastName}</h3>
          {isOnline && <FaCircle className="online" />}
        </div>
        <FaTimes className="close-chat" onClick={closeChat} />
      </div>
      <div className="chat-messages">
        {messages
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${
                msg.senderId === auth?._id ? "sender" : "receiver"
              }`}
            >
              <p className="message-content">{msg.content}</p>
            </div>
          ))}
        {isTyping && (
          <div className="chat-message receiver">
            <p className="message-content">
              <div className="typing__dot"></div>
              <div className="typing__dot"></div>
              <div className="typing__dot"></div>
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessageContent}
          onChange={handleMessageChange}
          placeholder="Type a message..."
        />
        <AiOutlineSend className="send-icon" onClick={handleSendMessage} />
      </form>
    </>
  );
};

export default Conversation;
