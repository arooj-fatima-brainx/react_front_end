import React, {useEffect, useState} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from '../../constants.js'

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

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

  if (!post) return <h2>Loading ...</h2>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to Posts</Link>
    </div>
  )
}

export default PostDetails;