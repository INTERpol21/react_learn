

export const getPageCount = (totalCount, limit) => {
  //Округляем элементы в большую сторону с помощью ceil
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++){
    result.push(i+1)
  }
  return result;
}