import View from "./view.js";

class pagination extends View { 
  _parentElement = document.querySelector(".pagination");
  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function(e) {
      const btn = e.target.closest(".btn");
      if(!btn) return;
      if (btn.classList.contains("btn-next")) {
        const page = this._data.currentPage + 1;
        handler(page);
      }
      if (btn.classList.contains("btn-prev")) {
        const page = this._data.currentPage - 1;
        handler(page);
      }
    }.bind(this));
  } 
  _generateMarkUp() {
    const numOfPages = Math.ceil(this._data.results / this._data.resPerPage);
    if(numOfPages === 1) {
      return "";
    }
    if(this._data.currentPage === 1 && numOfPages > 1) {
      return `<button class="btn pagination-btn btn-next"><span>Page 2</span><i class="fas fa-chevron-right"></i></button>`;
    }
    if(this._data.currentPage === numOfPages) {
      return `<button class="btn pagination-btn btn-prev"><i class="fas fa-chevron-left"></i><span>Page ${this._data.currentPage - 1}</span></button>`;
    }
    if(this._data.currentPage < numOfPages && numOfPages > 1) {
      return `<button class="btn pagination-btn btn-prev"><i class="fas fa-chevron-left"></i><span>Page ${this._data.currentPage - 1}</span></button>
      <button class="btn pagination-btn btn-next"><span>Page ${this._data.currentPage + 1}</span><i class="fas fa-chevron-right"></i></button>`;
    }
  }
}
export default new pagination();