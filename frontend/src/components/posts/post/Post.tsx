import "./post.css";
import { useState, useRef } from "react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { createLike, deleteLike, Like } from "../../../services/like";
import { formatDistanceToNow } from 'date-fns';

interface PostProps {
  content: string;
  _id: string;
  createdAt: string;
  liked?: boolean;
  likesCount: number;
  commentsCount: number;
}

const Post = ({ content, _id, createdAt, liked, commentsCount, likesCount }: PostProps) => {
  const [counts, setCounts] = useState({ likes: likesCount, comments: commentsCount });
  const [like, setLike] = useState(liked);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);

  const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });


  const handleLikeClick = async () => {
    if (!like) {
      const likeData: Like = {
        post: _id,
      };

      try {
        await createLike(likeData);
        setLike(true);
        setCounts({ ...counts, likes: counts.likes + 1 });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await deleteLike(_id);
        setLike(false);
        setCounts({ ...counts, likes: counts.likes - 1 });
      } catch (error) {
        console.error(error);
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
        <div className="icon_info">
          <FaHeart
            className={`action_icon like_icon ${like ? 'liked' : ''}`}
            onClick={handleLikeClick}
          />
          <span>{counts.likes}</span>
        </div>
        <div className="icon_info">
          <FaRegComment
            className="action_icon comment_icon"
            onClick={handleCommentIconClick}
          />
          <span>{counts.comments}</span>
        </div>
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
        <button onClick={handleCommentSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Post;
