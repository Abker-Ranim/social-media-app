import { useState, useEffect } from "react";
import { FaTimes, FaMinus, FaCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import "./conversations.css";
import Conversation from "../conversation/conversation";
import { getConversations } from "../../../services/conversation";
import { baseURL } from "../../../api/axios";
import { formatDistanceToNowStrict } from "date-fns";
import { useSocketContext } from "../../../helpers/SocketContext";
import { useAuth } from "../../../helpers/AuthProvider";
import { useChat } from "../../../helpers/ChatContext";

interface ConversationsProps {
  closeChat: () => void;
}
const Conversations: React.FC<ConversationsProps> = ({ closeChat }) => {
  const { auth } = useAuth();
  const { onlineUsers } = useSocketContext();
  const { showChat, chatUser, setChatUser } = useChat();

  const [conversations, setConversations] = useState<any[]>([]);
  const [inConversation, setInConversation] = useState(false);
  const [minimize, setMinimize] = useState(false);

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
    if (chatUser) {
      setMinimize(false);
      setInConversation(true);
    } else {
      fetcheConversations();
    }
  }, [chatUser]);

  const handleClick = (conversation: any) => {
    setInConversation(true);
    setChatUser(getParticipant(conversation));
  };

  const handleBack = () => {
    setChatUser(null);
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

  const minimizeChat = () => {
    setMinimize(!minimize);
    if (!minimize) {
      setInConversation(false);
      setChatUser(null);
    }
  };

  const openChat = () => {
    if (minimize) {
      fetcheConversations();
      setMinimize(false);
    }
  };

  const getParticipant = (conversation: any) => {
    const participants = conversation?.participants;
    if (participants.length == 1) {
      return participants[0];
    } else {
      return participants.find(
        (participant: any) => participant._id !== auth?._id
      );
    }
  };

  return (
    <div
      className={`chat ${minimize ? "minimized" : showChat ? "" : "closed"}`}
      onClick={openChat}
    >
      {inConversation ? (
        <Conversation
          handleBack={handleBack}
          minimizeChat={minimizeChat}
          closeChat={closeChat}
        />
      ) : (
        <>
          <div className={`chat-header ${minimize ? "minimized" : ""}`}>
            <h3>Chat with Friend</h3>
            <div className="icons">
              {!minimize && (
                <FaMinus className="close-chat" onClick={minimizeChat} />
              )}
              <FaTimes className="close-chat" onClick={closeChat} />
            </div>
          </div>
          <div className="chats">
            {conversations
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )
              .map((conversation, i) => (
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
                        getParticipant(conversation).profilePicture
                      }
                      alt="User"
                    />
                    {isOnline(getParticipant(conversation)._id) && (
                      <FaCircle className="online" />
                    )}
                  </div>
                  <div className="user_info">
                    <h4>
                      {getParticipant(conversation).firstName +
                        " " +
                        getParticipant(conversation).lastName}
                    </h4>
                    <div className="last_message">
                      <p>{conversation?.lastMessage}</p>
                      <span>{" - " + formatTime(conversation?.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Conversations;
