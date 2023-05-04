import View from "./view.js";

class Bookmarks extends View {  
  _parentElement = document.querySelector(".bookmarks");
  btn;
  _navBookmark = document.querySelector(".nav-bookmark");
  _errorMessage = "No bookmarks yet, find a nice recipe and bookmark it!";
  showBookmarks() {
    // this._navBookmark.addEventListener("mouseover", function() {
    //   this._parentElement.style.opacity = "1";
    // }.bind(this));
    // this._navBookmark.addEventListener("mouseout", function() {
    //   this._parentElement.style.opacity = "0";
    // }.bind(this));
  }
  _generateMarkUp() {
    const id = window.location.hash.slice(1);
    console.log(this._data);
    return `<ul class="bookmarks-list">${this._data.map(book => `<li class="preview ${book.id === id ? "preview-active" : ""}"><a class="preview-link ${book.id === id ? "preview-link-active" : ""}" href="#${book.id}"><figure class="preview-fig"><img src="${book.img}" alt="${book.title}"></figure><div class="preview-data"><h2 class="preview-title">${book.title}</h2><span class="preview-author">${book.author}</span></div></a></li>`).join("")}</ul>`
  }
} 
export default new Bookmarks();