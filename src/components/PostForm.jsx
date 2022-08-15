import React, { useState } from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput';

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: "", body: "" })

    const addNewPost = (event) => {
        // Предотвращаем дефолтное состояние браузера при нажатии на кнопку, то есть перезагрузку страницы
        event.preventDefault();
        // Передаем в массив наши посты
        // const newPost = {
        //   //Id должен быть уникальным, поэтому передаем Date.now()
        //   id:Date.now(),
        //   title,
        //   body
        // }
        //Созданный выше объект, передаем в массив постов. //...posts старые массивы и newPost добавление нового; Передаем данные сразу в массив
        //Меняем на newPost так как перенесли эту строчку из app.js
        // setPosts([...posts, { ...post, id: Date.now() }]);
        const newPost = {
            ...post, id: Date.now()
        }
        //Создаем деструктуризацию 
        create(newPost)
        //Обнуляем состояние Input после ввода
        setPost({ title: "", body: "" });


        //Для неуправляемого компонента
        //Забираем .value(Значение введенное в input)
        // console.log(bodyInputRef.current.value)
    };

    return (
        <form>
            {/* Управляемые компоненты */}
            <MyInput
                //Меняем title на post.title
                value={post.title}
                //функция для отслеживания действий пользователя
                //Заменяем нужное нам поле title: event.target.value, остальной объект ...posts оставляем не тронутым
                onChange={(event) => setPost({ ...post, title: event.target.value })}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value={post.body}
                //функция для отслеживания действий пользователя
                //Заменяем нужное нам поле title: event.target.value, остальной объект ...posts оставляем не тронутым
                onChange={(event) => setPost({ ...post, body: event.target.value })}
                type="text"
                placeholder="Название поста"
            />

            {/* Неуправляемый/неконтролируемый компонент */}
            {/* Сделан для примера, использоваться не будет */}
            {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста"/>  */}

            <MyButton onClick={addNewPost}>Создание поста</MyButton>
        </form>
    )
}

export default PostForm;