import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";


function App() {
 
  //Значение Текста 
  const [value, setValue] = useState("Текст в инпуте");




  return (
    <div className="App">
      <Counter/>
      <Counter/>
      
      <ClassCounter/>
      <ClassCounter/>
    </div>
  );
}

export default App;
