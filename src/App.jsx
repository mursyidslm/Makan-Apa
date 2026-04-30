import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import SearchResults from "./pages/SearchResults";
import CategoryRecipes from "./pages/CategoryRecipes";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:key" element={<RecipeDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/category/:key" element={<CategoryRecipes />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/category/:key" element={<Articles />} />
          <Route path="/article/:tag/:key" element={<ArticleDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
