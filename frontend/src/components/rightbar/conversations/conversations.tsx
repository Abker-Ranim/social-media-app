import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import "./conversations.css";
import Conversation from "../conversation/conversation";
import { useAuth } from "../../../helpers/AuthProvider";
import { getConversations } from "../../../services/conversation";

interface ConversationsProps {
  closeChat: () => void;
}
const Conversations: React.FC<ConversationsProps> = ({ closeChat }) => {
  const { auth } = useAuth();

  const [conversations, setConversations] = useState<any[]>([]);
  const [inConversation, setInConversation] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchedConversations = async () => {
      try {
        const result = await getConversations();
        setConversations(result);
      } catch (err) {
        toast.error("Error Loading Conversations. Please try again later.");
        console.error("Failed to load conversations:", err);
      }
    };
    fetchedConversations();
  }, []);

  const handleClick = (conversation: any) => {
    setInConversation(true);
    setUser(conversation?.participants[0]);
  };

  return (
    <div className="chat">
      {inConversation ? (
        <Conversation
          user={user}
          receiverId={user?._id}
          setInConversation={setInConversation}
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
                      <img
                        src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
                        alt="User"
                      />
                      <div className="user_info">
                        <h4>
                          {conversation?.participants[0]?.firstName +
                            " " +
                            conversation?.participants[0]?.lastName}
                        </h4>
                        <p>{conversation?.lastMessage}</p>
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
