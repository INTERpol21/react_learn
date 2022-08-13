import React, { useState } from "react";
import Counter from "./components/Counter";

function App() {
 
  //Значение Текста 
  const [value, setValue] = useState("Текст в инпуте");




  return (
    <div className="App">
      <Counter/>
      <Counter/>
      <Counter/>
      <Counter/>
    </div>
  );
}

export default App;
