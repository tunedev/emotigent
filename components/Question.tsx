"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          type="text"
          placeholder="Ask a question"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          type="submit"
          className="bg-purple-400 px-4 py-2 rounded-lg text-lg text-gray-900"
          disabled={loading}
        >
          Ask
        </button>
      </form>
      {loading && <div>...processing your question</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
