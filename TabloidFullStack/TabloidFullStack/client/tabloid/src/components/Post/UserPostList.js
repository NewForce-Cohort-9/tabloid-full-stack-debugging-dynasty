import { useEffect } from "react";
import { useState } from "react"
import { getAllApprovedUserPosts } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";

export const UserPostList = () => {
    const [userPosts, setUserPosts] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const getUserPosts = () => {
        const user = localStorage.getItem("userProfile")
        const parsedUser = JSON.parse(user)

        getAllApprovedUserPosts(parsedUser.id)
        .then(posts => setUserPosts(posts))
    }

    useEffect(() => {
        getUserPosts()
    }, [ ])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {userPosts.length ? userPosts.map((post) => (
                            <Post key={post.id} post={post} />
                        )) : <h1>No Posts Yet!</h1>}
                    </div>
                </div>
            </div>
        </>
    )
}