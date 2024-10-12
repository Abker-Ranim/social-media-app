import { useState, useEffect } from "react";
import { FaTimes, FaCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import "./conversations.css";
import Conversation from "../conversation/conversation";
import { useAuth } from "../../../helpers/AuthProvider";
import { getConversations } from "../../../services/conversation";
import { baseURL } from "../../../api/axios";
import { formatDistanceToNowStrict } from "date-fns";
import { useSocketContext } from "../../../helpers/SocketContext";

interface ConversationsProps {
  userId?: string;
  defaultUser?: any;
  closeChat: () => void;
}
const Conversations: React.FC<ConversationsProps> = ({
  defaultUser,
  closeChat,
}) => {
  const { auth } = useAuth();
  const { onlineUsers } = useSocketContext();

  const [conversations, setConversations] = useState<any[]>([]);
  const [inConversation, setInConversation] = useState(false);
  const [user, setUser] = useState<any>(defaultUser || {});

  const fetcheConversations = async () => {
    try {
      const result = await getConversations();
      setConversations(result);
    } catch (err) {
      toast.error("Error Loading Conversations. Please try again later.");
      console.error("Failed to load conversations:", err);
    }
  };

  useEffect(() => {
    if (defaultUser) {
      setInConversation(true);
    } else {
      fetcheConversations();
    }
  }, []);

  const handleClick = (conversation: any) => {
    setInConversation(true);
    setUser(conversation?.participants[0]);
  };

  const handleBack = () => {
    fetcheConversations();
    setInConversation(false);
  };

  const formatTime = (date: string) => {
    const result = formatDistanceToNowStrict(new Date(date), {
      addSuffix: false,
    });
    return result
      .replace(" seconds", "s")
      .replace(" second", "s")
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" days", "d")
      .replace(" day", "d");
  };

  const isOnline = (id: string) => {
    return onlineUsers.some((user) => user === id);
  };

  return (
    <div className="chat">
      {inConversation ? (
        <Conversation
          user={user}
          handleBack={handleBack}
          closeChat={closeChat}
        />
      ) : (
        <>
          <div className="chat-header">
            <h3>Chat with Friend</h3>
            <FaTimes className="close-chat" onClick={closeChat} />
          </div>
          <div className="chats">
            {conversations
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )
              .filter(
                (conversation) =>
                  conversation?.participants[0]?._id !== auth?._id
              )

              .map(
                (conversation, i) =>
                  conversation?.participants[0]?._id !== auth?._id && (
                    <div
                      className="user_details"
                      key={i}
                      onClick={() => handleClick(conversation)}
                    >
                      <div className="image_container">
                        <img
                          src={
                            baseURL +
                            "/" +
                            conversation?.participants[0]?.profilePicture
                          }
                          alt="User"
                        />
                        {isOnline(conversation?.participants[0]?._id) && (
                          <FaCircle className="online" />
                        )}
                      </div>
                      <div className="user_info">
                        <h4>
                          {conversation?.participants[0]?.firstName +
                            " " +
                            conversation?.participants[0]?.lastName}
                        </h4>
                        <div className="last_message">
                          <p>{conversation?.lastMessage}</p>
                          <span>
                            {" - " + formatTime(conversation?.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default Conversations;
