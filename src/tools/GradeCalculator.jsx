import { useState } from "react";

function GradeCalculator() {
  const [subjects, setSubjects] = useState([
    { name: "", score: "", weight: "" }
  ]);

  const [result, setResult] = useState("");

  function updateSubject(index, field, value) {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  }

  function addSubject() {
    setSubjects([...subjects, { name: "", score: "", weight: "" }]);
  }

  function removeSubject(index) {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  
  function calculate() {
    //check for empty fields
    const hasEmpty = subjects.some((subject)=>
    subject.name === "" ||
    subject.score === "" ||
    subject.weight === "" 
    )
    if(hasEmpty) {
      alert("fill all the inputs")
      return
    }

    const total = subjects.reduce((sum, subject)=>{
      const percentage = (subject.score / 100 ) * subject.weight 
      return sum + percentage
    }, 0)
    setResult(total.toFixed(1))
  }

  function getLetterGrade(grade){
    if(grade >= 70 ) return "A"
    if(grade >= 60 ) return "B"
    if(grade >= 50 ) return "C"
    if(grade >= 40 ) return "D"
    return "F"
  }

  
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Grade Calculator</h2>
    
        {/* column headers */}
        <div className="grid grid-cols-4 gap-3 mb-2 px-1">
          <span className="text-xs font-semibold text-gray-400 uppercase">Subject</span>
          <span className="text-xs font-semibold text-gray-400 uppercase">Score (/100)</span>
          <span className="text-xs font-semibold text-gray-400 uppercase">Weight (%)</span>
          <span></span>
        </div>
    
        {/* subject rows */}
        {subjects.map((subject, index) => (
          <div key={index} className="grid grid-cols-4 gap-3 mb-3">
            <input
              type="text"
              placeholder="e.g. CAT 1"
              value={subject.name}
              onChange={(e) => updateSubject(index, "name", e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-orange-400"
            />
            <input
              type="number"
              placeholder="e.g. 72"
              value={subject.score}
              onChange={(e) => updateSubject(index, "score", e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-orange-400"
            />
            <input
              type="number"
              placeholder="e.g. 30"
              value={subject.weight}
              onChange={(e) => updateSubject(index, "weight", e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-orange-400"
            />
            <button
              onClick={() => removeSubject(index)}
              className="text-red-400 hover:text-red-600 font-bold text-lg"
            >
              ✕
            </button>
          </div>
        ))}
    
        {/* add row button */}
        <button
          onClick={addSubject}
          className="text-sm text-orange-500 hover:text-orange-700 font-medium mb-6"
        >
          + Add subject
        </button>
    
        {/* calculate button */}
        <button
          onClick={calculate}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
        >
          Calculate
        </button>
    
        {/* result */}
        {result !== null && (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl text-center">
            <div className="text-4xl font-bold text-orange-600">{result}%</div>
            <div className="text-xl font-semibold text-gray-600 mt-1">
              Grade: {getLetterGrade(parseFloat(result))}
            </div>
          </div>
        )}
      </div>
    )
}

export default GradeCalculator;