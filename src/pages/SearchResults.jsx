import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchRecipes } from "../utils/api";
import { dummyRecipes } from "../utils/dummy";
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    async function load() {
      setLoading(true);
      try {
        const data = await searchRecipes(query);
        setResults(data.results || []);
      } catch (err) {
        console.error("Search failed, using dummy:", err);
        const filtered = dummyRecipes.filter((r) =>
          r.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.length > 0 ? filtered : dummyRecipes.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }
    load();
    setSearchInput(query);
  }, [query]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Hasil Pencarian</h1>
        <form onSubmit={handleSearch} className="search-form-inline">
          <input
            type="text"
            placeholder="Cari resep..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="hero-search-input"
          />
          <button type="submit" className="hero-search-btn">Cari</button>
        </form>
        {query && <p className="search-info">Menampilkan hasil untuk: <strong>"{query}"</strong></p>}
      </div>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <div className="recipe-grid">
          {results.map((recipe, i) => (
            <RecipeCard key={`${recipe.key}-${i}`} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Tidak ada hasil</h3>
          <p>Coba gunakan kata kunci lain, misalnya: "rendang", "soto", "nasi goreng"</p>
        </div>
      )}
    </div>
  );
}
