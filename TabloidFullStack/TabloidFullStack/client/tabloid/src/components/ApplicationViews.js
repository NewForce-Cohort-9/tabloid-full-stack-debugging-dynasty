import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import MyPosts from "./Post/MyPosts";
import PostDetail from "./Post/PostDetail";
import PostForm from "./Post/PostForm";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/create" element={<PostForm />} /> 
      </Routes>
   )};
