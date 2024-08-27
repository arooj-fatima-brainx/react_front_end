import React, {useEffect, useState} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from '../../constants.js'

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try{
        const response = await fetch(`${API_URL}/posts/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        console.log('error', e);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const deletePost =  async () => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        navigate("/")
      } else {
        throw response
      }

    } catch (e) {
      console.error(e)
    }
  };

  if (!post) return <h2>Loading ...</h2>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      { " | " }
      <Link to="/">Back to Posts</Link>
      { " | " }
      <button onClick={deletePost}>Delete</button>
    </div>
  )
}

export default PostDetails;