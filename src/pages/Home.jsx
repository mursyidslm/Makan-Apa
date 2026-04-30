import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipes, fetchCategories } from "../utils/api";
import { dummyRecipes, dummyCategories } from "../utils/dummy";
import RecipeCard from "../components/RecipeCard";
import CategoryChip from "../components/CategoryChip";
import Loading from "../components/Loading";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [recipeData, catData] = await Promise.all([
          fetchRecipes(1),
          fetchCategories(),
        ]);
        setRecipes(recipeData.results || []);
        setCategories(catData.results || []);
      } catch (err) {
        console.error("Failed to load data, using dummy:", err);
        setRecipes(dummyRecipes);
        setCategories(dummyCategories);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function loadMore() {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await fetchRecipes(nextPage);
      if (data.results?.length) {
        setRecipes((prev) => [...prev, ...data.results]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Failed to load more:", err);
    } finally {
      setLoadingMore(false);
    }
  }

  function handleHeroSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Masak Apa <span className="highlight">Hari Ini?</span>
          </h1>
          <p className="hero-subtitle">
            Temukan ribuan resep masakan Indonesia yang mudah diikuti
          </p>
          <form onSubmit={handleHeroSearch} className="hero-search">
            <input
              type="text"
              placeholder="Cari resep, misalnya: nasi goreng, rendang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <button type="submit" className="hero-search-btn">
              Cari Resep
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="section">
          <h2 className="section-title">Kategori Resep</h2>
          <div className="category-list">
            {categories.map((cat) => (
              <CategoryChip key={cat.key} category={cat} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Recipes */}
      <section className="section">
        <h2 className="section-title">Resep Terbaru</h2>
        <div className="recipe-grid">
          {recipes.map((recipe, i) => (
            <RecipeCard key={`${recipe.key}-${i}`} recipe={recipe} />
          ))}
        </div>
        <div className="load-more-wrap">
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Memuat..." : "Muat Lebih Banyak"}
          </button>
        </div>
      </section>
    </div>
  );
}
