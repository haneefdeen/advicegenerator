import React, { useState } from "react";

const App = () => {
  const [advice, setAdvice] = useState("Please click the advice button to get advice");
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);

  async function getAdvice() {
    setCopied(false);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(advice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="container">
      <h1 className="title">Wisdom Whisper: Your Daily Dose of Advice</h1>
      <div className="advice-box">
        <h3 className="advice-text">"{advice}"</h3>
        <button className="copy-btn" onClick={copyToClipboard}>
          📋 Copy Advice
        </button>
        {copied && <p className="copied-msg">✅ Advice copied!</p>}
      </div>
      <button className="advice-btn" onClick={getAdvice}>Get Advice</button>
      <p className="count-text">
        You have read <b>{count}</b> pieces of advice.
      </p>
    </div>
  );
};

export default App;
