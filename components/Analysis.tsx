"use client";

const Analysis = ({ summary, subject, mood, negative, textColor, color }) => {
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];
  return (
    <>
      <div className="px-6 py-10" style={{ backgroundColor: color }}>
        <h2 className={`text-2xl ${textColor}`}>Analysis</h2>
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
    </>
  );
};

export default Analysis;
