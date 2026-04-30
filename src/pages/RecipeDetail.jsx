import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRecipeDetail } from "../utils/api";
import { dummyRecipeDetail } from "../utils/dummy";
import Loading from "../components/Loading";

export default function RecipeDetail() {
  const { key } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchRecipeDetail(key);
        setRecipe(data.results);
      } catch (err) {
        console.error("Failed to load recipe, using dummy:", err);
        setRecipe(dummyRecipeDetail);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [key]);

  if (loading) return <Loading />;
  if (error) return <div className="error-state"><p>{error}</p><Link to="/">Kembali ke Beranda</Link></div>;
  if (!recipe) return <div className="error-state"><p>Resep tidak ditemukan.</p><Link to="/">Kembali ke Beranda</Link></div>;

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Kembali
      </Link>

      <div className="detail-header">
        <div className="detail-img-wrap">
          <img
            src={recipe.thumb}
            alt={recipe.title}
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400/e8f5e9/00a057?text=No+Image";
            }}
          />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{recipe.title}</h1>
          {recipe.author && (
            <p className="detail-author">
              oleh <strong>{recipe.author.user}</strong>
              {recipe.author.datePublished && ` — ${recipe.author.datePublished}`}
            </p>
          )}
          <div className="detail-meta">
            {recipe.times && (
              <div className="detail-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <span className="meta-label">Waktu</span>
                  <span className="meta-value">{recipe.times}</span>
                </div>
              </div>
            )}
            {recipe.servings && (
              <div className="detail-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <div>
                  <span className="meta-label">Porsi</span>
                  <span className="meta-value">{recipe.servings}</span>
                </div>
              </div>
            )}
            {recipe.difficulty && (
              <div className="detail-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <div>
                  <span className="meta-label">Tingkat</span>
                  <span className="meta-value">{recipe.difficulty}</span>
                </div>
              </div>
            )}
          </div>
          {recipe.desc && <p className="detail-desc">{recipe.desc}</p>}
        </div>
      </div>

      <div className="detail-content">
        {/* Alat yang Dibutuhkan */}
        {recipe.needItem?.length > 0 && (
          <section className="detail-section">
            <h2>Alat yang Dibutuhkan</h2>
            <div className="need-item-grid">
              {recipe.needItem.map((item, i) => (
                <div key={i} className="need-item">
                  {item.thumb_item && (
                    <img src={item.thumb_item} alt={item.item_name} />
                  )}
                  <span>{item.item_name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bahan-bahan */}
        {recipe.ingredient?.length > 0 && (
          <section className="detail-section">
            <h2>Bahan-bahan</h2>
            <ul className="ingredient-list">
              {recipe.ingredient.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Langkah Memasak */}
        {recipe.step?.length > 0 && (
          <section className="detail-section">
            <h2>Langkah Memasak</h2>
            <ol className="step-list">
              {recipe.step.map((step, i) => (
                <li key={i}>
                  <div className="step-number">{i + 1}</div>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
