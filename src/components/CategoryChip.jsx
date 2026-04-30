import { Link } from "react-router-dom";

export default function CategoryChip({ category }) {
  return (
    <Link to={`/category/${category.key}`} className="category-chip">
      {category.category || category.title}
    </Link>
  );
}
