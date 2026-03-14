import { useState } from "react";

function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  function handleClick(btn){
    if(btn === "C"){
    setDisplay(0)
    setEquation("")
  }else if(btn === "=" ){
    if(equation === "" ) return
    const result = safeEvaluate(equation)
    setDisplay(result)
    setEquation("")
  }else{
    setDisplay(equation + btn)
    setEquation(equation + btn)
  }
  }
  

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div className="w-64 mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4 p-2 text-right bg-gray-100 rounded font-mono text-xl">
      {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            type="button"
            onClick={()=>handleClick(btn)}
            className="p-2 bg-gray-200 hover:bg-blue-300 rounded text-lg font-semibold"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BasicCalculator;