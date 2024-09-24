import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { PostList } from "./Post/PostList";
import MyPosts from "./Post/MyPosts";
import PostDetail from "./Post/PostDetail";
import { CommentList } from "./Comments/CommentList.js";
import { CommentForm } from "./Comments/CommentForm.js";
import {TagList} from "./Tags/TagList.js";
import { CategoryList } from "./Category/CategoryList.js";
import { CategoryCreate } from "./Category/CategoryCreate.js";
import { NewTag } from "./Tags/CreateTag.js";
import { CategoryEdit } from "./Category/CategoryEdit.js";
import { CategoryDelete } from "./Category/CategoryDelete.js";
import { DeleteComment } from "./Comments/DeleteComment.js";
import { EditTag } from "./Tags/EditTag.js";
import { DeleteTag } from "./Tags/DeleteTag.js";



export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
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
      </Routes>
   )};
