"use client";

import { useState } from "react";
import { updateEntry } from "@/utils/api";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  useAutosave({
    data: value,
    onSave: async (_value: string) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _value);
      console.log("UPDATE", updated);
      setAnalysis(updated.analysis);
      setIsLoading(false);
    },
  });

  const { mood, summary, color, subject, negative, textColor } = analysis;
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  return (
    <div className="w-full h-full  grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>...saving</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl" style={{ color: textColor }}>
            Analysis
          </h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}: </span>
                <span className="capitalize">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        AI Stuff
      </div>
    </div>
  );
};

export default Editor;
