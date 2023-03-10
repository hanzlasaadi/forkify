import View from './View.js';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');

  constructor() {
    super();
    this._addHandlerOpenModal();
    this._addHandlerCloseModal();
  }

  _toggle() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerOpenModal() {
    this._openBtn.addEventListener('click', this._toggle.bind(this));
  }

  _addHandlerCloseModal() {
    this._overlay.addEventListener('click', this._toggle.bind(this));
    this._closeBtn.addEventListener('click', this._toggle.bind(this));
  }

  addHandlerSubmit(callback) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = new FormData(this);
      const data = Object.fromEntries(dataArr);
      callback(data);
    });
  }
}

export default new AddRecipeView();
