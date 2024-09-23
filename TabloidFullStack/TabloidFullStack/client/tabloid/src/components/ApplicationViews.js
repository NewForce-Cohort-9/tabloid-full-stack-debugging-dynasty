import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { PostList } from "./Post/PostList";
import MyPosts from "./Post/MyPosts";
import PostDetail from "./Post/PostDetail";
import { CommentList } from "./Comments/CommentList.js";
import { CommentForm } from "./Comments/CommentForm.js";
import { CategoryList } from "./Category/CategoryList.js";




export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:postId/comments" element={<CommentList />} />
        <Route path="/posts/:postId/comments/add" element={<CommentForm />} />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>
   )};
