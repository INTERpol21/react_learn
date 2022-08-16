import React from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PostItem from "./PostItem";
import "../styles/App.css"


const PostList = ({ posts, title, remove }) => {
  //Условная отрисовка, что бы при отсутствии постов выпадала надпись 
  if (!posts.length) {
    return (
      <h1 style={{ textAlign: "center" }}>Посты не найдены.</h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {/* Применяем библиотеку TransitionGroup  */}
      <TransitionGroup>
        {/* Так как используем Map, то проводим поиск по key={post.id} */}
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
          {/* number={index + 1} передаем номер элемента в массиве, +1, что бы начинался с 1 */}
            <PostItem remove={remove} number={index + 1} post={post} />
            </CSSTransition>
        )}
      </TransitionGroup>
      
      
    </div>
  );
};

export default PostList;
