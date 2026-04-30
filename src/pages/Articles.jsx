import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticleCategories, fetchNewArticles } from "../utils/api";
import { dummyArticleCategories, dummyArticles } from "../utils/dummy";
import Loading from "../components/Loading";

export default function Articles() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [catData, artData] = await Promise.all([
          fetchArticleCategories(),
          fetchNewArticles(),
        ]);
        setCategories(catData.results || []);
        setArticles(artData.results || []);
      } catch (err) {
        console.error("Failed to load articles, using dummy:", err);
        setCategories(dummyArticleCategories);
        setArticles(dummyArticles);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="articles-page">
      <h1 className="page-title">Artikel</h1>
      <p className="page-subtitle">Tips, trik, dan inspirasi seputar dunia kuliner Indonesia</p>

      {/* Article Categories */}
      {categories.length > 0 && (
        <section className="section">
          <h2 className="section-title">Kategori Artikel</h2>
          <div className="category-list">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                to={`/articles/category/${cat.key}`}
                className="category-chip"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* New Articles */}
      {articles.length > 0 && (
        <section className="section">
          <h2 className="section-title">Artikel Terbaru</h2>
          <div className="article-grid">
            {articles.map((article, i) => (
              <Link
                key={`${article.key}-${i}`}
                to={`/article/${article.tags || "artikel"}/${article.key}`}
                className="article-card"
              >
                {article.thumb && (
                  <div className="article-card-img-wrap">
                    <img
                      src={article.thumb}
                      alt={article.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/400x200/fff3e0/ff6b35?text=Artikel";
                      }}
                    />
                  </div>
                )}
                <div className="article-card-body">
                  <h3>{article.title}</h3>
                  {article.tags && <span className="article-tag">{article.tags}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
