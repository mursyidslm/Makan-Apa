const BASE_URL = "https://masak-apa.tomorisakura.vercel.app";

async function fetchJSON(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchRecipes(page = 1) {
  return fetchJSON(`/api/recipes/${page}`);
}

export async function fetchRecipesWithLimit(limit = 5) {
  return fetchJSON(`/api/recipes-length/?limit=${limit}`);
}

export async function fetchRecipeDetail(key) {
  return fetchJSON(`/api/recipe/${key}`);
}

export async function searchRecipes(query) {
  return fetchJSON(`/api/search/?q=${encodeURIComponent(query)}`);
}

export async function fetchCategories() {
  return fetchJSON(`/api/category/recipes`);
}

export async function fetchCategoryRecipes(key) {
  return fetchJSON(`/api/category/recipes/${key}`);
}

export async function fetchArticleCategories() {
  return fetchJSON(`/api/category/article`);
}

export async function fetchArticlesByCategory(key) {
  return fetchJSON(`/api/category/article/${key}`);
}

export async function fetchNewArticles() {
  return fetchJSON(`/api/articles/new`);
}

export async function fetchArticleDetail(tag, key) {
  return fetchJSON(`/api/article/${tag}/${key}`);
}
