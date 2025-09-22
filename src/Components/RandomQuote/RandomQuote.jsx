import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import { FaSyncAlt, FaCopy } from 'react-icons/fa';

const RandomQuote = () => {
  const [quote, setQuote] = useState({
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  });

  const [copied, setCopied] = useState(false);

  const loadQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setQuote(data);
      setCopied(false);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote({
        content: "Unable to load quote. Please check your connection.",
        author: "System",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <div className='quote-container'>
      <h1 className="heading">Daily Inspiration</h1>
      <div className="quote">{quote.content}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">{quote.author?.split(',')[0] || "Unknown"}</div>
          <div className="icons">
            <FaSyncAlt
              onClick={loadQuote}
              className="icon"
              title="Reload quote"
            />
            <FaCopy
              onClick={handleCopy}
              className="icon"
              title={copied ? "Copied!" : "Copy quote"}
              style={{ color: copied ? '#00ffcc' : 'white' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
