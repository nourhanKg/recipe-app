import View from "./view.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe-content");
  _errorMessage = "We can't find this recipe. Please try another one.";
  addHandlerRender(handler) {
    const events = ["hashchange", "load"];
    events.forEach(ev => window.addEventListener(ev, function() {
    handler();
  }));
  }
  addHandlerServings(handler) {
    this._parentElement.addEventListener("click", function(e) {
      const btn = e.target.closest(".btn-tiny");
      if(!btn) return;
      if(btn.classList.contains("increase-btn")){
        const newServ = this._data.servings + 1;
        handler(newServ);
      }
      if(btn.classList.contains("decrease-btn")){
        if(this._data.servings === 1) return;
        const newServ = this._data.servings - 1;
        handler(newServ);
      }
    }.bind(this))
  }
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function(e) {
      const btn = e.target.closest(".bookmark-btn");
      if(!btn) return;
      handler();
    });
  }
  changeBackground() {
    //set background to recipe photo
    document.querySelector(".recipe-header").style.backgroundImage = `url(${this._data.img})`;
  }
  _generateMarkUp() {
    return `
    <div class="recipe"><div class="recipe-header"><h2 class="recipe-title"><span>${this._data.title}</span></h2></div><div class="recipe-data"><div class="recipe-info"><i class="far fa-clock"></i><span>${this._data.cookTime}</span>minutes</div><div class="recipe-info recipe-servings"><i class="fas fa-user-friends"></i> <span>${this._data.servings}</span>servings<button class="btn btn-tiny increase-btn"><i class="fas fa-plus"></i></button><button class="btn btn-tiny decrease-btn"><i class="fas fa-minus"></i></button></div><button class="btn bookmark-btn" data-booked="${this._data.marked}">${this._data.marked ? `<i class="fas fa-bookmark"></i>` : `<i class="far fa-bookmark"></i>`}</button></div><div class="recipe-ingredients"><h4 class="title1">recipe ingredients</h4><ul class="recipe-ingredients-list">${this._data.ingredients.map(ing => `<li class="recipe-item"><i class="fas fa-check"></i><span>${ing.quantity ?? ""} ${ing.unit} ${ing.description}</span></li>`).join("")}</ul></div><div class="recipe-prep"><h4 class="title1">how to cook it</h4><p class="recipe-instructions">This recipe was carefully designed and tested by<span class="recipe-author">${this._data.author}</span>. Please check out directions at their website.</p><a href="${this._data.sourceURL}" target="_blank" class="btn instructions-link">Directions <i class="fas fa-arrow-right"></i></a></div></div>`;
  }
}

export default new RecipeView();