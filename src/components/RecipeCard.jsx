import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.key}`} className="recipe-card">
      <div className="recipe-card-img-wrap">
        <img
          src={recipe.thumb}
          alt={recipe.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x300/e8f5e9/00a057?text=No+Image";
          }}
        />
        {recipe.difficulty && (
          <span className={`badge badge-${recipe.difficulty.toLowerCase()}`}>
            {recipe.difficulty}
          </span>
        )}
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <div className="recipe-card-meta">
          {recipe.times && (
            <span className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {recipe.times}
            </span>
          )}
          {recipe.serving && (
            <span className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              {recipe.serving}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
