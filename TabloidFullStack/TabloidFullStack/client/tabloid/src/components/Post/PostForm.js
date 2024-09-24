import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../Managers/CategoryManager';
import { addPost } from '../../Managers/PostManager';
import { getUserProfileById } from '../../Managers/UserProfileManager';

export default function PostForm() {
    const [post, setPost] = useState({
        title: '',
        content: '',
        imageLocation: '',
        publishDateTime: '',
        categoryId: '' 
    });

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch categories for the dropdown
    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    // Fetch full user profile from API
    useEffect(() => {
        const localProfile = JSON.parse(localStorage.getItem("userProfile"));
        
        if (localProfile && localProfile.id) {
            getUserProfileById(localProfile.id).then((profileData) => {
                localStorage.setItem("userProfile", JSON.stringify(profileData)); // Update local storage with full profile
                setPost({ ...post, author: profileData });
            });
        }
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: name === 'categoryId' ? Number(value) : value 
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const userProfile = JSON.parse(localStorage.getItem("userProfile")); 
        const selectedCategory = categories.find(c => c.id === post.categoryId);

        if (!userProfile || !selectedCategory) {
            console.error("Missing userProfile or selectedCategory");
            return;
        }

        // (Title, Content, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
        const newPost = {
            ...post,
            userProfileId: userProfile.id
            // isApproved: true,
            // createDateTime: new Date().toISOString(),
            // categoryId: selectedCategory.id,
            
            // publishDateTime: new Date().toISOString(),
            // // content: 
            // // title:

            
        };

        addPost(newPost)
            .then(() => navigate(`/posts`)) 
            .catch((err) => console.error("Failed to add post:", err));
    };

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
            <fieldset>
                <label htmlFor="imageLocation">Header Image URL (optional)</label>
                <input 
                    type="text" 
                    name="imageLocation" 
                    value={post.imageLocation} 
                    onChange={handleChange} 
                />
            </fieldset>
            <fieldset>
                <label htmlFor="publishDateTime">Publication Date (optional)</label>
                <input 
                    type="date" 
                    name="publishDateTime" 
                    value={post.publishDateTime} 
                    onChange={handleChange} 
                />
            </fieldset>
            <button type="submit">Save Post</button>
        </form>
    );
}