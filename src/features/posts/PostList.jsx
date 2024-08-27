import React, {useState, useEffect} from "react";
import {API_URL} from "../../constants.js";
import {Link} from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(`${API_URL}/posts`, {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError('An error occurred');
        console.log('Error', e);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw response;
      }
    } catch (e) {
      console.error(e)
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
