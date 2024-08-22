import "./post.css";
import { useState, useRef } from "react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { createLike, deleteLike, Like } from "../../../services/like";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';

interface PostProps {
  content: string;
  postId: string;
  createdAt: string;
}

const Post = ({ content, postId ,createdAt}: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);

  const date = createdAt ? new Date(createdAt) : new Date();
  const isValidDate = !isNaN(date.getTime());
  const formattedDate = isValidDate
    ? formatDistanceToNow(date, { addSuffix: true })
    : 'Date invalide';


  const handleLikeClick = async () => {
    if (!liked) {
      const likeData: Like = {
        post: postId,
      };

      try {
        const response = await createLike(likeData);
        console.log("Post liked successfully", response);
        setLiked(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Server response:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    } else {
      try {
        const response = await deleteLike(postId);
        console.log("Post unliked successfully", response);
        setLiked(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Server response:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  const handleCommentIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };


  return (
    <div className="post">
      <div className="post_user_details">
        <img
          src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
          alt="User"
        />
        <div className="user_name">
          <h4>Ranim</h4>
          <span>{formattedDate}</span>
        </div>
      </div>
    
      <div className="post_content_details">
        <p>{content}</p>
      </div>
      
      <div className="post_actions">
        <FaHeart
          className={`action_icon like_icon ${liked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        />
        <FaRegComment
          className="action_icon comment_icon"
          onClick={handleCommentIconClick}
        />
      </div>

      <div className="post_comments">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <span className="comment_user">User</span>
            <span className="comment_text">{comment}</span>
          </div>
        ))}
      </div>

      <div className="comment_input">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={handleCommentChange}
          ref={commentInputRef} 
        />
        <button onClick={handleCommentSubmit}>Post</button>
      </div>
    </div>
  );
};

export default Post;
