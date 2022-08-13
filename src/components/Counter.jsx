import React,{useState} from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

    //Функции на + и - добавления в счетчик 
    function increment() {
        setCount(count + 1);
      }
    
      function decrement() {
        setCount(count - 1);
      }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

//Не забывать экспорт компонента 
export default Counter;