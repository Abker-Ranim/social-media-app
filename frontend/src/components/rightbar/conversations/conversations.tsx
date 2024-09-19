import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import "./conversations.css";
import Conversation from "../conversation/conversation";
import { useAuth } from "../../../helpers/AuthProvider";
import { getConversations } from "../../../services/conversation";

const Conversations = () => {
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
  }, [inConversation]);

  const handleClick = (conversation: any) => {
    setInConversation(true);
    setUser(conversation?.participants[0]);
  };

  return (
    <div className="chat">
      <div className="chat-header">
        {inConversation && (
          <IoMdArrowRoundBack
            className="return"
            onClick={() => setInConversation(false)}
          />
        )}
        <h3>
          {inConversation
            ? user?.firstName + " " + user?.lastName
            : "Chat with Friend"}
        </h3>
        <FaTimes className="close-chat" />
      </div>
      {inConversation ? (
        <Conversation receiverId={user?._id} />
      ) : (
        <div className="chats">
          {conversations
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
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
      )}
    </div>
  );
};

export default Conversations;