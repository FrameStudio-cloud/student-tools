import { useState } from "react";

export default function FinancialCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    if (result === "") return;
    const p = principal;
    const r = rate;
    const t = time;
    const i = (p * r * t) / 100;
    setResult(i);
  }
  return (
    <div className="w-96 mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2x1 font-bold text-gray-700 mb-6">Intrest Rate</h1>
      <div className="flex flex-col gap-1 mb-4">
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="principle (p)"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="rate (R)"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time (T)"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg mt-2"
      >
        calculate
      </button>
      {result !== null && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center text-xl font-bold text-blue-600">
          Intrest: {result}
        </div>
      )}
    </div>
  );
}
