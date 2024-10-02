import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../../Managers/PostManager";
import { addSubscription } from "../../Managers/SubscriptionManager"; 
import { getReactionsForPost, addPostReaction, removePostReaction } from "../../Managers/PostReactionManager";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const [reactions, setReactions] = useState([]);
  const [userReaction, setUserReaction] = useState(null); // up, down, or null

  useEffect(() => {
    getPostById(id).then((data) => setPost(data));
  }, [id]);

  const fetchReactions = () => {
    getReactionsForPost(id).then((data) => {
      setReactions(data);
      const userReactionRecord = data.find(r => r.userProfileId === userProfile.id);
      if (userReactionRecord) {
        setUserReaction(userReactionRecord.reactionId);
      }
    });
  };

  useEffect(() => {
    fetchReactions();
  }, [id]);

  const handleSubscribe = () => {
    if (post && userProfile) {
      addSubscription(userProfile.id, post.userProfileId)
        .then(() => alert(`Subscribed to ${post.author.displayName}`))
        .catch((err) => console.error("Failed to subscribe", err));
    } else {
      alert("You need to be logged in to subscribe.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => {
        alert("Post deleted successfully.");
        navigate("/posts"); 
      });
    }
  };

  const handleReaction = (reactionType) => {
    if (!userProfile) {
      alert("You need to be logged in to react.");
      return;
    }

    const reaction = reactions.find(r => r.name.toLowerCase() === reactionType);
    if (!reaction) {
      alert("Reaction not found.");
      return;
    }
    const reactionId = reaction.id;

    if (userReaction === reactionId) {
      removePostReaction(post.id, userProfile.id, reactionId)
        .then(() => {
          setUserReaction(null);
          setReactions(prevReactions => 
            prevReactions.map(r => 
              r.id === reactionId 
                ? { ...r, reactionCount: r.reactionCount - 1 } 
                : r
            )
          );
        })
        .catch(error => {
          console.error("Error removing reaction:", error);
          alert("Failed to remove reaction.");
        });
      return;
    }

    addPostReaction(post.id, reactionId, userProfile.id)
      .then(() => {
        setUserReaction(reactionId);
        fetchReactions(); //refresh reaction count
      })
      .catch(error => {
        console.error("Error adding reaction:", error);
        alert("Failed to add reaction.");
      });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Published on: {new Date(post.publishDateTime).toLocaleDateString()}</p>
      <p>Author: {post.author.displayName}</p>

      
      <button className="btn btn-secondary" onClick={() => navigate("/posts")}>
        Back to posts
      </button>

        {/* Subscribe button */}
        <button className="btn btn-outline-success mx-1" onClick={handleSubscribe}>
        Subscribe to {post.author.displayName}
      </button>


      {/* Link to the comment list page */}
      <Link to={`/posts/${id}/comments`} className="btn btn-outline-primary mx-1" title="View Comments">
               View Comments
      </Link>
      
      <Link to="/create-reaction" className="btn btn-outline-primary mx-1">
        Create New Reaction
      </Link>

      <div>
        {reactions.map((reaction) => (
          <div key={reaction.id} style={{ display: 'inline-block', margin: '10px' }}>
            <img
              src={reaction.imageLocation}
              alt={reaction.name}
              style={{ width: '150px', height: '150px', padding:'10px', cursor: 'pointer', opacity: userReaction === reaction.id ? 1 : 0.5 }}
              onClick={() => handleReaction(reaction.name.toLowerCase())}
            />
            <span>{reaction.reactionCount}</span>
          </div>
        ))}
      </div>
      

    </div>



  );
}








//Will//
// import { useEffect, useState } from "react";
// import { getPostById } from "../../Managers/PostManager.js";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Button, Card } from "reactstrap";

// export const PostDetails = () => {
//   const [postDetails, setPostDetails] = useState({});
//   const [postDate, setPostDate] = useState("");
//   const [currentUser, setCurrentUser] = useState({})

//   const navigate = useNavigate()

//   const { id } = useParams();

//   const createDate = (dateTime) => {
//     const date = new Date(dateTime);
//     const day = date.getDay();
//     const month = date.getMonth();
//     const year = date.getFullYear();

//     return `${month}/${day}/${year}`;
//   };

//   useEffect(() => {
//     getPostById(id).then((postObj) => setPostDetails(postObj));
//   }, [id]);

//   useEffect(() => {
//     const dateString = createDate(postDetails.publishDateTime);
//     setPostDate(dateString);
//   }, [postDetails]);

//   useEffect(() => {
//     const user = localStorage.getItem("userProfile")
//       const parsedUser = JSON.parse(user)
//       setCurrentUser(parsedUser)
//   }, [])

//   if (!postDetails.id) {
//     return <div>No details yet</div>;
//   }

//   return (
//     <>
//       <Card className="m-4">
//         <p className="text-left px2">{postDetails.title}</p>
//         <img
//           src={`${postDetails.imageLocation}`}
//           alt={`Image for ${postDetails.title}`}
//         />
//         <p className="text-left px2">Content: {postDetails.content}</p>
//         <p className="text-left px2">Published On: {postDate}</p>
//         <p className="text-left px2">
//           Posted By: {postDetails.userProfile.displayName}
//         </p>
//         {currentUser.id === postDetails.userProfileId ? 
//           <>
//             <Button color="danger" onClick={() => navigate(`/posts/delete/${id}`, {state: { post: postDetails }})}>
//               Delete Post
//             </Button>
//             <Button color="warning" onClick={() => navigate(`/posts/edit/${id}`, {state: {post: postDetails}})}>
//               Edit Post
//             </Button>
//           </>
//           :
//           ""
//           }
//           <Link to={"/myposts"}>My Posts</Link>
//           <Link to={"/posts"}>All Posts</Link>
//       </Card>
//       <Link to={`/posts/${id}/comments`}>View Comments</Link>
//     </>
//   );
// };








