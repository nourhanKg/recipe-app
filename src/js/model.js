//Business Logic//

// import { async } from "regenerator-runtime";
// import { indexOf } from "core-js/core/array";
import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
import bookmarks from "./views/bookmarks.js";
import recipeView from "./views/recipeView.js";

export const state = {
  recipeInfo: {},
  search: {
    query: "",
    searchResults: [],
    resPerPage: RES_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
}

export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const {recipe : recipeInfo} = data.data;
    console.log(recipeInfo);
    state.recipeInfo = {
      id: recipeInfo.id,
      title: recipeInfo.title,
      img: recipeInfo.image_url,
      author: recipeInfo.publisher,
      cookTime: recipeInfo.cooking_time,
      servings: recipeInfo.servings,
      ingredients: recipeInfo.ingredients,
      sourceURL: recipeInfo.source_url
    }
    if(state.bookmarks.some(book => book.id === id)) 
    state.recipeInfo.marked = true;
    else 
    state.recipeInfo.marked = false;
  }
  catch(error) {
    // console.error(`${error} Boom!`);
    throw error;
  }
}

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    const {recipes} = data.data;
    console.log(data);
    state.search.results = recipes.length;
    state.search.searchResults = recipes.map(result => {
      return {
      id: result.id,
      title: result.title,
      img: result.image_url,
      author: result.publisher,
      }
    })
    console.log(state.search.searchResults);
  }
  catch(error) {
    throw error;
  }
}
export const getSearchResultPage = function(page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resPerPage; //0
  const end = (page * state.search.resPerPage); //10
  return state.search.searchResults.slice(start, end)
}

export const updateServings = function(newServ) {
  const ratio = newServ / state.recipeInfo.servings;
  state.recipeInfo.ingredients.forEach(ing => {
    ing.quantity = parseFloat(ing.quantity * ratio, 1);
  });
  state.recipeInfo.servings = newServ;
}

export const addBookmarks = function(recipe) {
  state.bookmarks.push(recipe);
  state.recipeInfo.marked = true;
}

export const removeBookmarks = function(id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  state.recipeInfo.marked = false;
}