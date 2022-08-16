import React from "react";
import classes from "./MyModal.module.css";

//компонент скрытия или установки модального окна
//props visible отвечает за видимость окна
//функция setVisible которая будет скрывать модальное окно при нажатии темной области
const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [classes.myModal]

    if (visible) {
        //если visible есть, то пушим cl.active
        rootClasses.push(classes.active);
    }


    return (
        //склеиваем классы через пробел
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            {/* event.stopPropagation() препятствует продвижению события дальше, но на текущем элементе все обработчики будут вызваны. */}
            <div className={classes.myModalContent} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
