export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">🍳</span>
          <span className="brand-text">ResepKita</span>
        </div>
        <p className="footer-desc">
          Kumpulan resep masakan Indonesia terlengkap. Temukan inspirasi memasak setiap hari.
        </p>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ResepKita &mdash; Data dari masakapahariini.com</p>
        </div>
      </div>
    </footer>
  );
}
