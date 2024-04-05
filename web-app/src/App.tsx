import React, { useEffect, useState } from "react";
import "./App.css";
import { sendGetRequest } from "./lib/http";

type Article = {
  id: string;
  name: string;
  priceEur: number;
};

function App() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  const fetchArticles = async () => {
    const { articles: fetchedArticles } = await sendGetRequest("/api/articles");
    setArticles(fetchedArticles as Article[]);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // fetch…

  return (
    <div className="App">
      <header className="App-header">
        {articles ? (
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <span>{article.name}</span>
                <button>-</button>0<button>+</button>
              </li>
            ))}
          </ul>
        ) : (
          "Chargement…"
        )}
      </header>
    </div>
  );
}

export default App;
