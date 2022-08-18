import { useState } from "react"

export const useFetching = (callback) => {
    //Состояние отвечающие за загрузку 
    const [isLoading, setIsLoading] = useState(false)
    //Кейс обработки ошибок
    const [error, setError] = useState('')

    const fetching = async(...args) => {
        try {
            //Делаем состояние true для показа крутилки загрузки
            setIsLoading(true)
            await callback(...args);
        } catch (error) {
            //если произошла ошибка
            setError(error.massage)
        } finally {
            //отключение крутилки в любом случае
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error]
}