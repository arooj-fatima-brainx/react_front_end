import React from "react";
import { Route, Routes } from "react-router-dom";
import PostList from "../features/posts/PostList";
import PostDetails from "../features/posts/PostDetails";

function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="posts/:id" element={<PostDetails />} />
      <Route path="/new" element={<h1>New Post Form</h1>} />
    </Routes>
  )
}

export default AppRoutes;