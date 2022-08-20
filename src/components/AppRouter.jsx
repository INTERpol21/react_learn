import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Error from "../pages/Error";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from './PostIdPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostIdPage />} />
      <Route path="/*" element={<Error/>} />
    </Routes>
  )

}

export default AppRouter;

