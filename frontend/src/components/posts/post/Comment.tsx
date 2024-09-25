import "./post.css";
import { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { updateComment, deleteComment } from "../../../services/comment";
import toast from "react-hot-toast";
import { useAuth } from "../../../helpers/AuthProvider";
import { User } from "../../../services/user";
import { baseURL } from "../../../api/axios";

interface CommentProps {
  content: string;
  _id: string;
  createdAt: string;
  commentOwner: User;
  onDelete: (_id: string) => void;
}

const Comment = ({
  content: initialContent,
  _id,
  createdAt,
  commentOwner,
  onDelete,
}: CommentProps) => {
  const { auth } = useAuth();

  const [content, setContent] = useState(initialContent);
  const [updatingComment, setUpdatingComment] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(content);

  const handleEditComment = async () => {
    if (updatedComment && updatedComment.trim() !== "") {
      try {
        await updateComment(_id, updatedComment);
        toast.success("Comment Updated Successfully");
        setContent(updatedComment);
        setUpdatingComment(false);
      } catch (error) {
        toast.error("Error Updating Comment. Please try again later.");
        console.error("Failed to update Comment:", error);
      }
    }
  };

  const handleCancelEditComment = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel updating? Any unsaved changes will be lost."
    );
    if (confirm) {
      setUpdatedComment(content);
      setUpdatingComment(false);
    }
  };

  const handleDeleteComment = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDeletion) {
      try {
        await deleteComment(_id);
        toast.success("Comment Deleted Successfully");
        onDelete(_id);
      } catch (error) {
        toast.error("Error Deleting Comment. Please try again later.");
        console.error("Failed to delete comment:", error);
      }
    }
  };

  return (
    <div className="comment">
      {auth && (
              <img
                src={baseURL + "/" + commentOwner?.image}
                alt="Profile"
                style={{ cursor: "default" }}
              />
            )}
      <div className="info">
        <div className="content">
          <span className="user">
            {commentOwner.firstName + " " + commentOwner.lastName}
          </span>
          {updatingComment ? (
            <div className="edit_comment">
              <textarea
                className="comment_content"
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
                autoFocus
              />
              <div className="buttons">
                <button className="save" onClick={handleEditComment}>
                  Save
                </button>
                <button className="cancel" onClick={handleCancelEditComment}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text">{content}</p>
          )}
        </div>
        <span className="date">{formatDistanceToNow(new Date(createdAt))}</span>

        {commentOwner._id === auth?._id && (
          <div className="comment_options">
            <button className="edit" onClick={() => setUpdatingComment(true)}>
              <FaEdit />
            </button>
            <button className="delete" onClick={handleDeleteComment}>
              <FaTrashAlt />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
