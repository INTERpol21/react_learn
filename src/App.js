import React, { useRef, useMemo, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import ReactDOM from "react-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./styles/App.css";

import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
  ]);

  //Двухстороннее связывание через title. Управляемый Input
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState("");
  //Меняем в качестве значения не строку, а объект, что бы не делать для каждого компонента новое состояние, если компонентов много
  //Создаем в объектах пустые строки
  // const [post, setPost] = useState({ title: "", body: "" });

  //Не управляемый Input
  // const bodyInputRef = useRef();

  const [filter, setFilter] = useState({ sort: '', query: '' });
  //состояние видимости окна 
  const [modal, setModal] = useState(false);
  //Кастомные hooks
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


  //Теперь можно использовать этот компонент создания постов !
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  };
  //По той же тактике что и с созданием постов, получаем post из дочернего компонента
  //Прокидываем компонент на PostList и PostItem
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  //Сортировка постов по алфавиту (названию и описанию)


  return (
    <div className="App">
      <MyButton style={{marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      {/* Так как нельзя передавать на прямую из дочернего в родителя, создаем callback */}
      
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      {/* Условная отрисовка, что бы при отсутствии постов выпадала надпись//Перенес в PostList  */}
      {/* {sortedAndSearchedPosts.length ? ( */}
      {/* //После выполнения условия, выполняется тернарный оператор ? : */}
      <PostList
        remove={removePost}
        //передаем отфильтрованный и отсортированный массив
        posts={sortedAndSearchedPosts}
        title="Посты про JS"
      />
      {/* ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены.</h1>
      )} */}
    </div>
  );
}

export default App;
