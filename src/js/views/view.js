export default class View {
  _data;
  renderData(data) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markUp = this._generateMarkUp();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  updateView(data) {
    // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    console.log("updating");
    this._data = data;
    const newMarkUp = this._generateMarkUp();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currentElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEle, i) => {
      const currEle = currentElements[i];
      // console.log(newEle, currEle, newEle.classList.contains("bookmark-btn"));
      if(!newEle.isEqualNode(currEle) && newEle.firstChild?.nodeValue != null) {
        // console.log(newEle.isEqualNode(currEle), newEle, i, newEle.firstChild?.nodeValue);
        currEle.textContent = newEle.textContent;
      }
      if(!newEle.isEqualNode(currEle) && newEle.classList.contains("bookmark-btn")) {
        // console.log("change");
        currEle.innerHTML = newEle.innerHTML;
      }
      // if(!newEle.isEqualNode(currEle) && (newEle.classList.contains("preview") || newEle.classList.contains("preview-link"))) {
      //   currEle.classList.add("preview-active", "preview-link-active");
      // }
  });

  }
  renderSpinner() {
    this._clear();
    const markUP = `<div class="load-spinner lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markUP);
  }
  _clear() {
    this._parentElement.innerHTML ="";
  }
  renderError(errorMes = this._errorMessage) {
    this._clear();
    const markUP = `<div class="error"><p class="error-message"><i class="fas fa-bomb"></i>  ${errorMes}</p></div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markUP);
  }
} 
