import View from "./view.js";

class searchView extends View { 
  _searchForm = document.querySelector(".search-form");
  _parentElement = document.querySelector(".search-results");
  _errorMessage = `Sorry, we couldn't find any search results for ${this.getQuery()}`

  getQuery() {
    return this._searchForm.querySelector(".search-input").value;
  }

  clearInput() {
    this._searchForm.querySelector(".search-input").value = "";
  }
  _generateMarkUp() {
    console.log(this._data);
    const id = window.location.hash.slice(1);
    return this._data.map(res => {
      return `
    <li class="preview ${res.id === id ? "preview-active" : ""}"><a class="preview-link ${res.id === id ? "preview-link-active" : ""}" href="#${res.id}"><figure class="preview-fig"><img src="${res.img}" alt="${res.title}"></figure><div class="preview-data"><h2 class="preview-title">${res.title}</h2><span class="preview-author">${res.author}</span></div></a></li>`}).join("");
  }

  addHandlerSearch(handler) {
    this._searchForm.addEventListener("submit", function(e) {
      console.log("loades");
      e.preventDefault();
      handler();
    })
  }
}

export default new searchView();