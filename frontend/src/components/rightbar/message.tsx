import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { createMessage, getMessage, Message as MessageType } from "../../services/message";
import toast from "react-hot-toast";
import "./message.css";

const MessageComponent = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessageContent, setNewMessageContent] = useState("");
  
    const currentUser = localStorage.getItem("userId"); 
  
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const fetchedMessages = await getMessage();
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
          toast.error("Failed to load messages.");
        }
      };
  
      fetchMessages();
    }, []);
  
    const handleSendMessage = async () => {
      if (newMessageContent.trim()) {
        const newMessage = { content: newMessageContent, sender: currentUser };
        try {
          const response = await createMessage(newMessage);
          if (response && response._id) {
            toast.success("Message sent successfully");
            setMessages((prevMessages) => [...prevMessages, response]);
            setNewMessageContent("");
          }
        } catch (error) {
          toast.error("Error sending message. Please try again later.");
          console.error("Failed to send message:", error);
        }
      } else {
        console.warn("Message content is empty");
      }
    };
  
    
  
    return (
      <div className="chat">
        <div className="chat-header">
          <h3>Chat with Friend</h3>
          <FaTimes className="close-chat" />
        </div>
        <div className="chat-messages">
          {messages
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((msg) => (
              <div
                key={msg._id}
                className={`chat-message ${msg.sender._id === currentUser ? "sender" : "receiver"}`}
              >
                {msg.content}
              </div>
            ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            placeholder="Type a message..."
          />
          <AiOutlineSend onClick={handleSendMessage} className="send-icon" />
        </div>
      </div>
    );
  };
  
  export default MessageComponent;
