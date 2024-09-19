import { useState, useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { sendMessage, Message as MessageType } from "../../../services/message";
import { useAuth } from "../../../helpers/AuthProvider";
import toast from "react-hot-toast";
import "./conversation.css";
import { getConversation } from "../../../services/conversation";
import { useSocketContext } from "../../../helpers/SocketContext";

interface props {
  receiverId: string;
}

const Conversation = ({ receiverId }: props) => {
  const { auth } = useAuth();
  const { socket } = useSocketContext();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessageContent, setNewMessageContent] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

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

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (newMessageContent.trim() !== "") {
      try {
        const response = await sendMessage(newMessageContent, receiverId);
        setMessages((prevMessages) => [...prevMessages, response]);
        setNewMessageContent("");
        scrollToBottom();
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
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          placeholder="Type a message..."
        />
        <AiOutlineSend className="send-icon" onClick={handleSendMessage} />
      </form>
    </>
  );
};

export default Conversation;
