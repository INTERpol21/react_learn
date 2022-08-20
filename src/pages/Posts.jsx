import React, { useEffect, useState } from 'react';
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

    const [filter, setFilter] = useState({ sort: '', query: '' });
    //состояние видимости окна 
    const [modal, setModal] = useState(false);
    //Состояние в которое помешаем общее количество постов 
    const [totalPages, setTotalPages] = useState(0)
    //лимит постов
    const [limit, setLimit] = useState(10)
    //номер страницы
    const [page, setPage] = useState(1)
    //Кастомные hooks декомпозиция 
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    //Кастомный хук отвечающий за загрузку и отлов ошибок
    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts(response.data);
            //Обращаемся к jsonplaceholder за headers['x-total-count']
            const totalCount = response.headers["x-total-count"];

            setTotalPages(getPageCount(totalCount, limit));
        }
    );



    useEffect(() => {
        fetchPosts(limit, page);
    }, []);



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

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page);
    }

    return (
        <div className="App">

            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
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
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            {isPostsLoading ? (
                <div
                    style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
                >
                    <Loader />
                </div>
            ) : (
                //передаем отфильтрованный и отсортированный массив
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    title="Посты про JS"
                />
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
