import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMsg = 'Have a nice little fuck and add some motherfucking bookmarks!!!';
  _okMsg = '';

  addHandlerBookmark(callback) {
    addEventListener('load', callback);
  }

  _markup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
