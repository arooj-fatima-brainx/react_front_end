import React, {useState, useEffect} from "react";
import {API_URL} from "../../constants.js";
import { fetchAllPosts, deletePost as deletePostService } from "../../services/postService.js";
import {Link} from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data)
        setLoading(false)
      } catch (e) {
        setError('An error occurred');
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await deletePostService(id);
      setPosts(posts.filter((post) => post.id !== id))
    } catch (e) {
      console.error("Failed to delete the post: ", e)
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>
          <div className="post-links">
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            { " | " }
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
