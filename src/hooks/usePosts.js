import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  //useMemo оптимизация рендеринга страницы, данные в inpute не обновляются при любом вводе, только финальный результат
  const sortedPosts = useMemo(() => {
    if (sort) {
      //localeCompare сравнение строк по алфавиту
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  //Сортировка и поиск
  const sortedAndSearchedPosts = useMemo(() =>
    //includes ищет в массиве query элемент, если он есть передает true
    {
      //toLowerCase для оптимизации чувствительности регистра
      return sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
    }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
