import {API_URL} from "../constants.js";

async function fetchAllPosts() {
  const response = await fetch(`${API_URL}/posts`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json();
}

async function fetchPost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  if (response.status ===  204) {
    return null
  }
  return response.json();
}

export { fetchAllPosts, deletePost, fetchPost }