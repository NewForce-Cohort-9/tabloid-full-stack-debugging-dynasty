import React from "react";
import { Link } from "react-router-dom";

export default function Comment({ comment, postId }) { //accept postId as a prop for delete
  return (
    <>
      <td>{comment.subject}</td>
      <td>{comment.content}</td>
      <td>{comment.userProfile.displayName}</td>
      <td>{comment.createDateTime}</td>
      <td>
        <Link to={`/posts/${postId}/comments/edit/${comment.id}`} className="btn btn-outline-primary mx-1 text-primary" title="Edit Comment">
        
        </Link>
        <Link to={`/posts/${postId}/comments/delete/${comment.id}`} className="btn btn-outline-danger mx-1" title="Delete Comment">
    
        </Link>
      </td>
    </>
  );
}