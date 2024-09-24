import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../Managers/PostManager';
import { getAllCategories } from '../../Managers/CategoryManager';

export default function EditPostForm() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    });
    const [categories, setCategories] = useState([]);

    // Fetch post data and categories for dropdown
    useEffect(() => {
        getPostById(postId).then((existingPost) => {
            setPost({
                title: existingPost.title,
                content: existingPost.content,
                categoryId: existingPost.category?.id || ''
            });
        });
        getAllCategories().then(setCategories);
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: name === 'categoryId' ? Number(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        if (!userProfile) {
            console.error("UserProfile not found in localStorage");
            return;
        }

        const updatedPost = {
            id: Number(postId),
            title: post.title,
            content: post.content,
            imageLocation: "default.jpg",  
            createDateTime: new Date().toISOString(),
            publishDateTime: new Date().toISOString(),
            isApproved: true,
            categoryId: post.categoryId,
            userProfileId: userProfile.id
            
        };

        console.log('Updated Post Payload:', updatedPost);

        updatePost(updatedPost)
            .then(() => navigate(`/posts`))
            .catch((err) => {
                console.error("Failed to update post:", err);
            });
    };

    if (!post || !categories.length) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={post.title} 
                    onChange={handleChange} 
                    required 
                />
            </fieldset>
            <fieldset>
                <label htmlFor="content">Content</label>
                <textarea 
                    name="content" 
                    value={post.content} 
                    onChange={handleChange} 
                    required 
                />
            </fieldset>
            <fieldset>
                <label htmlFor="categoryId">Category</label>
                <select 
                    name="categoryId" 
                    value={post.categoryId} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </fieldset>
            <button type="submit">Save Changes</button>
        </form>
    );
}


























// import { useEffect, useState } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { getAllCategories } from "../../Managers/CategoryManager.js"
// import { submitUpdatePost } from "../../Managers/PostManager.js"

// export const EditPost = () => {
//     const [postCategories, setPostCategories] = useState([])
//     const [title, setTitle] = useState("")
//     const [content, setContent] = useState("")
//     const [imageLocation, setImageLocation] = useState("")
//     const [post, setPost] = useState({})

//     const { state } = useLocation()
//     const navigate = useNavigate()

//     const updatePost = async (e) => {
//         e.preventDefault()
//         await submitUpdatePost(post)
//         navigate(`/post/${post.id}`)
//     }

//     useEffect(() => {
//         setTitle(state.post.title)
//         setContent(state.post.content)
//         setImageLocation(state.post.imageLocation)
//     }, [state])

//     useEffect(() => {
//         let postCopy = {}
//         postCopy.id = state.post.id
//         postCopy.title = title
//         postCopy.content = content
//         postCopy.imageLocation = imageLocation
//         postCopy.categoryId = state.post.categoryId

//         setPost(postCopy)
//     }, [title, content, imageLocation])

//     useEffect(() => {
//         getAllCategories().then(categoryArr => setPostCategories(categoryArr))
//     }, [])

//     return (
//         <>
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="cards-column">
//                         <label for="addPostTitle">Edit Title</label>
//                         <input id="addPostTitle" onChange={(e) => {
//                                                                 setTitle(e.target.value)
//                         }} value={title}></input><br />
//                         <label for="addPostContent">Content</label>
//                         <input id="addPostContent" onChange={(e) => {
//                                                                     setContent(e.target.value)
//                         }}value={content}></input><br/>
//                         <label for="addPostImageLocation">Image Url</label>
//                         <input id="addPostImageLocation" onChange={(e) => {
//                                                                     setImageLocation(e.target.value)
//                         }} value={imageLocation}></input><br/>
//                         <select name="categories" id="createPostCategories" onChange={(e) => {
//                                     let copy = {...post}
//                                     copy.categoryId = parseInt(e.target.value)
//                                     setPost(copy)
//                                 }}>
//                                 <option>Select Post Category:</option>
//                             {postCategories.map(category => {
//                                 if (state.post.categoryId === category.id) {
//                                     return <option value={`${category.id}`} selected>{category.name}</option>
//                                 } else {
//                                     return <option value={`${category.id}`} >{category.name}</option>
//                                 }
//                             })}
//                         </select><br />

//                         <button id="submitNewPost" type="submit" onClick={(e) => updatePost(e)}>Edit Post!</button><br/>
//                         <Link to={`/post/${post.id}`}>Back to post details!</Link>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }