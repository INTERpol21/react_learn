import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Posts() {
  const [posts, setPosts] = useState([]);

  //Двухстороннее связывание через title. Управляемый Input
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState("");
  //Меняем в качестве значения не строку, а объект, что бы не делать для каждого компонента новое состояние, если компонентов много
  //Создаем в объектах пустые строки
  // const [post, setPost] = useState({ title: "", body: "" });

  //Не управляемый Input
  // const bodyInputRef = useRef();

  const [filter, setFilter] = useState({ sort: "", query: "" });
  //состояние видимости окна
  const [modal, setModal] = useState(false);
  //Состояние в которое помешаем общее количество постов
  const [totalPages, setTotalPages] = useState(0);
  //лимит постов
  const [limit, setLimit] = useState(10);
  //номер страницы
  const [page, setPage] = useState(1);
  //Кастомные hooks декомпозиция
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
 

  //Кастомный хук отвечающий за загрузку и отлов ошибок
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      //делаем бесконечную ленту
      setPosts([...posts, ...response.data]);
      //Обращаемся к jsonplaceholder за headers['x-total-count']
      const totalCount = response.headers["x-total-count"];

      setTotalPages(getPageCount(totalCount, limit));
    }
  );
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  //Теперь можно использовать этот компонент создания постов !
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  //По той же тактике что и с созданием постов, получаем post из дочернего компонента
  //Прокидываем компонент на PostList и PostItem
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  //Сортировка постов по алфавиту (названию и описанию)

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все" },
        ]}
      />

      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {/* Условная отрисовка, что бы при отсутствии постов выпадала надпись//Перенес в PostList  */}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты "
      />
      <div ref={lastElement} style={{ height: 20, background: "green" }} />
      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50,  }}
        >
          <Loader />
        </div>
      )}

      <Pagination
        //номер страницы
        page={page}
        //функция которая изменят номер страницы
        changePage={changePage}
        //общее количество страниц
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
