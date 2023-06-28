import "./styles.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const { content, author } = response.data;
      setQuote(content);
      setAuthor(author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div id="quote-box" className="text-center">
      <div id="text">
        <p>{quote}</p>
      </div>
      <div id="author">
        <p>- {author}</p>
      </div>
      <div>
        <button id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>
        <a id="tweet-quote" href="#" onClick={tweetQuote} target="_top">
          Tweet Quote
        </a>
      </div>
    </div>
  );
};

export default App;

