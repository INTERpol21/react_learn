import React, { useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import ReactDOM from "react-dom";

import "./styles/App.css";

import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

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

  //Делаем состояния управляемые
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, serSearchQuery] = useState("");

  function getSortedPosts() {
    if (selectedSort) {
      return [...posts].sort((a, b) =>
        //localeCompare сравнение строк по алфавиту
        a[sort].localeCompare(b[setSelectedSort])
      );
    }
    return posts;
  }

  //помешаем результат выполнения function getSortedPosts
  const sortedPosts = getSortedPosts();

  //Теперь можно использовать этот компонент создания постов !
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  //По той же тактике что и с созданием постов, получаем post из дочернего компонента
  //Прокидываем компонент на PostList и PostItem
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  //Сортировка постов по алфавиту (названию и описанию)
  const sortPosts = (sort) => {
    setSelectedSort(sort);
    //Изменяем копию массива
    //localeCompare сравнение строк по алфавиту
  };

  return (
    <div className="App">
      {/* Так как нельзя передавать на прямую из дочернего в родителя, создаем callback */}
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <div>
        <MyInput
          value={searchQuery}
          onChange={(event) => serSearchQuery(event.target.value)}
          placeholder="Поиск....."
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>

      {/* Условная отрисовка, что бы при отсутствии постов выпадала надпись  */}
      {posts.length !== 0 ? (
        //После выполнения условия, выполняется тернарный оператор ? :
        <PostList
          remove={removePost}
          posts={sortedPosts}
          title="Посты про JS"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены.</h1>
      )}
    </div>
  );
}

export default App;
