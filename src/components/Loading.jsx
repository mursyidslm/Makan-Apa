export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-img" />
            <div className="skeleton-body">
              <div className="skeleton-line wide" />
              <div className="skeleton-line medium" />
              <div className="skeleton-line short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
