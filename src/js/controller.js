import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    // 1. Loading Recipe
    const id = window.location.hash.slice(1);
    if (!id) return;

    //showing spinner
    recipeView.renderSpinner();
    // loadrecipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);

    //markup
  } catch (error) {
    // console.error(error);
    // console.error(error, 'Controller');
    recipeView.renderErr();
  }
};

const controlSearch = async function (query) {
  try {
    //show spinner
    resultsView.renderSpinner();

    // loading search results asyncly
    await model.loadSearchResults(query);

    /*
    // getting results from the state
    const results = model.state.search.results;
    console.log(results.length ? 'Gooood!' : 'You fucked up!!!');
    */

    //rendering results as HTML
    resultsView.render(model.displayResultsPerPage());
  } catch (error) {
    recipeView.renderErr(error);
  }
};

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearch);
}
init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
