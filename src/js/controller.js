//Application Logic//

////////////support old browsers////////////
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';


///////////////Importing modules////////////
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import pagination from "./views/pagination.js";
import bookmarks from "./views/bookmarks.js";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function() {
  //1)updat active recipe
  // searchView.renderData(model.getSearchResultPage());
  //2)load recipe//
  try {
    const id = window.location.hash.slice("1");
    console.log(id);
    if(!id) return;
    //1)load spinner//
    recipeView.renderSpinner();

    //2)update results view 
    bookmarks.updateView(model.state.bookmarks);

    //3)load recipe
    await model.loadRecipe(id);

    //4)render recipe//
    recipeView.renderData(model.state.recipeInfo);
    recipeView.changeBackground();
  }
  catch(error) {
    recipeView.renderError();
  }
}

const controlSearch = async function() {
  try {
    const query = searchView.getQuery();
    if(!query) return;
    searchView.renderSpinner();
    await model.loadSearchResults(query);
    searchView.clearInput();
    searchView.renderData(model.getSearchResultPage(1));
    pagination.renderData(model.state.search);
  }
  catch(error) {
    console.log(error);
  }
}

const controlServings = function(newServ) {
  model.updateServings(newServ);
  recipeView.updateView(model.state.recipeInfo);
  // recipeView.changeBackground();
}

const updateSearchPage = function(page) {
  model.state.search.currentPage = page;
  console.log(model.state.search.currentPage);
  searchView.renderData(model.getSearchResultPage(page));
  pagination.renderData(model.state.search);
}

const controlBookmarks = function() {
  // console.log(model.state.recipeInfo.marked);
  model.state.recipeInfo.marked ? model.removeBookmarks(model.state.recipeInfo.id) : model.addBookmarks(model.state.recipeInfo);
  recipeView.updateView(model.state.recipeInfo);
  bookmarks.renderData(model.state.bookmarks);
  // bookmarks.toggleBookmark(model.state.recipeInfo.marked);
}

const initialize = function() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmarks);
  bookmarks.showBookmarks();
  searchView.addHandlerSearch(controlSearch);
  pagination.addHandlerPagination(updateSearchPage);
}
initialize();
