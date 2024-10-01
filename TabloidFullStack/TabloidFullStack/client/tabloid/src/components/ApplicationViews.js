import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import PostDetail from "./Post/PostDetail";
import MyPosts from "./Post/MyPosts.js"
import PostForm from "./Post/PostForm";
import EditPostForm from "./Post/EditPostForm.js";
import { CommentList } from "./Comments/CommentList.js";
import { CommentForm } from "./Comments/CommentForm.js";
import {TagList} from "./Tags/TagList.js";
import { CategoryList } from "./Category/CategoryList.js";
import { CategoryCreate } from "./Category/CategoryCreate.js";
import { NewTag } from "./Tags/CreateTag.js";
import { CategoryEdit } from "./Category/CategoryEdit.js";
import { CategoryDelete } from "./Category/CategoryDelete.js";
import { useState } from "react";
import { DeleteComment } from "./Comments/DeleteComment.js";
import { EditTag } from "./Tags/EditTag.js";
import { DeleteTag } from "./Tags/DeleteTag.js";
import { UserList } from "./UserProfile/UserProfileList.js";
import { UserDetails } from "./UserProfile/UserProfileDetails.js";



export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({})

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/posts" element={<PostList />} />
      {/* <Route
        path="/posts/:id/comments/create"
        element={<AddCommentForm currentUser={currentUser} />}
      /> */}
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/edit/:postId" element={<EditPostForm />} />
        <Route path="/posts/:postId/comments" element={<CommentList />} />
        <Route path="/posts/:postId/comments/add" element={<CommentForm />} />
        <Route path="/posts/:postId/comments/delete/:commentId" element={<DeleteComment />}/>
        <Route path="/posts/:postId/comments/edit/:commentId" element={<CommentForm />}/>
        <Route path="/tags" element={<TagList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/add" element={<CategoryCreate />} />
        <Route path="/tag/add" element={<NewTag />} />
        <Route path="/category/edit/:id" element={<CategoryEdit/>} />
        <Route path="/category/delete/:id" element={<CategoryDelete />} />
        <Route path="/tag/edit/:id" element={<EditTag />} /> 
        <Route path="/tag/delete/:id" element={<DeleteTag />} />
        <Route path="/user" element={< UserList/>} />
        <Route path="/users/:userId" element={<UserDetails/>} /> 
      </Routes>
   )};
