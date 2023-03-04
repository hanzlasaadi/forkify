import View from './View.js';
import icons from '../../img/icons.svg';
import { ResultsPerPage } from '../config.js';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  crrPage;

  _markup() {
    const numPages = Math.ceil(this._data.results.length / ResultsPerPage);
    this.crrPage = this._data.page;

    if (this.crrPage === 1 && numPages > 1) return this._genButton('first');

    if (this.crrPage === numPages && numPages > 1)
      return this._genButton('last');

    if (this.crrPage < numPages) return this._genButton('middle');

    // if (numPages === 1) DEFAULT
    return '';
  }

  _genButton(position) {
    switch (position) {
      case 'first':
        return `
          <button class="btn--inline pagination__btn--next">
          <span>Page ${this.crrPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>`;
      case 'last':
        return `<button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this.crrPage - 1}</span>
          </button>`;
      case 'middle':
        return `
          <button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this.crrPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
              <span>Page ${this.crrPage + 1}</span>
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>`;
      default:
        return '';
    }
  }
}

export default new Pagination();
