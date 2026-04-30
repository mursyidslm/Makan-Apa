import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleDetail } from "../utils/api";
import { dummyArticleDetail } from "../utils/dummy";
import Loading from "../components/Loading";

export default function ArticleDetail() {
  const { tag, key } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchArticleDetail(tag, key);
        setArticle(data.results);
      } catch (err) {
        console.error("Failed to load article, using dummy:", err);
        setArticle(dummyArticleDetail);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [tag, key]);

  if (loading) return <Loading />;
  if (error) return <div className="error-state"><p>{error}</p><Link to="/articles">Kembali ke Artikel</Link></div>;
  if (!article) return <div className="error-state"><p>Artikel tidak ditemukan.</p><Link to="/articles">Kembali ke Artikel</Link></div>;

  return (
    <div className="article-detail">
      <Link to="/articles" className="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Kembali ke Artikel
      </Link>

      <article className="article-content">
        <h1>{article.title}</h1>
        {article.thumb && (
          <img
            src={article.thumb}
            alt={article.title}
            className="article-hero-img"
            onError={(e) => {
              e.target.src = "https://placehold.co/800x400/fff3e0/ff6b35?text=Artikel";
            }}
          />
        )}
        {article.author && <p className="article-author">oleh <strong>{article.author}</strong></p>}
        {article.date_published && <p className="article-date">{article.date_published}</p>}
        {article.description && <div className="article-body">{article.description}</div>}
      </article>
    </div>
  );
}
