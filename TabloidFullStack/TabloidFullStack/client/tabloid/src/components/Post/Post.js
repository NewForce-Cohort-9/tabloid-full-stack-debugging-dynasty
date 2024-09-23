import React from "react";
// import { EditPencil, TrashcanDelete } from "../Icons";
import { Link } from "react-router-dom";

export default function Post ({ post }) {
  return (
    <>
      <td>{post.id}</td>
      <td>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </td>
      <td>{post.author.displayName}</td>
      <td>{post.category?.name}</td>
      <td>{new Date(post.publishDateTime).toLocaleDateString()}</td>
      
    </>
  );
}