import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCategoryRecipes } from "../utils/api";
import { dummyRecipes } from "../utils/dummy";
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";

export default function CategoryRecipes() {
  const { key } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchCategoryRecipes(key);
        setRecipes(data.results || []);
      } catch (err) {
        console.error("Failed to load category, using dummy:", err);
        setRecipes(dummyRecipes.slice(0, 6));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [key]);

  const categoryName = key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="category-page">
      <Link to="/" className="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Kembali
      </Link>

      <div className="category-header">
        <h1>{categoryName}</h1>
        <p>{recipes.length} resep ditemukan</p>
      </div>

      {loading ? (
        <Loading />
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe, i) => (
            <RecipeCard key={`${recipe.key}-${i}`} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <h3>Belum ada resep</h3>
          <p>Kategori ini masih kosong</p>
        </div>
      )}
    </div>
  );
}
