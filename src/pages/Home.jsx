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
    <div className="home" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero" data-testid="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" data-testid="hero-title">
            Masak Apa <span className="highlight" data-testid="hero-highlight">Hari Ini?</span>
          </h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            Temukan ribuan resep masakan khas ediitt Indonesia yang mudah diikuti
          </p>
          <form
            onSubmit={handleHeroSearch}
            className="hero-search"
            data-testid="hero-search-form"
          >
            <input
              type="text"
              placeholder="Cari resep, misalnya: nasi goreng, rendang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
              data-testid="hero-search-input"
            />
            <button
              type="submit"
              className="hero-search-btn"
              data-testid="cari-resep-button"
            >
              Cari Resep
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="section" data-testid="categories-section">
          <h2 className="section-title" data-testid="categories-title">
            Kategori Resep
          </h2>
          <div className="category-list" data-testid="category-list">
            {categories.map((cat) => (
              <CategoryChip key={cat.key} category={cat} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Recipes */}
      <section className="section" data-testid="latest-recipes-section">
        <h2 className="section-title" data-testid="latest-recipes-title">
          Resep Terbaru
        </h2>
        <div className="recipe-grid" data-testid="recipe-grid">
          {recipes.map((recipe, i) => (
            <RecipeCard key={`${recipe.key}-${i}`} recipe={recipe} />
          ))}
        </div>
        <div className="load-more-wrap">
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={loadingMore}
            data-testid="load-more-button"
          >
            {loadingMore ? "Memuat..." : "Muat Lebih Banyak"}
          </button>
        </div>
      </section>
    </div>
  );
}
