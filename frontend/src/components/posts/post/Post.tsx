import "./post.css";
import { useState, useRef } from "react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { createLike, deleteLike, Like } from "../../../services/like";
import { formatDistanceToNow } from 'date-fns';
import { Comment, createComment, getCommentsByPostId } from "../../../services/comment";

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const postDate = formatDistanceToNow(createdAt, { addSuffix: true });

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

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      try {
        const newComment = { content: commentText, post: _id };
        await createComment(newComment);
        await fetchComments();
        setCounts({ ...counts, comments: counts.comments + 1 });
        setCommentText("");
        setShowComments(true);
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    }
  };

  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByPostId(_id);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };


  const toggleComments = async () => {
    setShowComments(!showComments);
  
    if (!showComments) {
      await fetchComments();
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
          <span>{postDate}</span>
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

      <button className="toggle_comments_button" onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments "}
      </button>

      {showComments && comments.length > 0 && (
        <div className="post_comments">
          {comments
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((comment, index) => (
            <div key={index} className="comment">
              <img
                src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
                alt="User"
              />
              <div className="info">
                <div className="content">
                  <span className="user">{comment.commentOwner.firstName + " " + comment.commentOwner.lastName}</span>
                  <p className="text">{comment.content}</p>
                </div>
                <span className="date">{formatDistanceToNow(comment.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

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
