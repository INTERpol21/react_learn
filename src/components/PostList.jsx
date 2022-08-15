import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {/* Так как используем Map, то проводим поиск по key={post.id} */}
      {posts.map((post, index) =>
        //number={index + 1} передаем номер элемента в массиве, +1, что бы начинался с 1 
        <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
      )}
    </div>
  );
};

export default PostList;
