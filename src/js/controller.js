import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views.js';

// const recipeContainer = document.querySelector('.recipe');

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
    console.error(error);
  }
};

function init() {
  recipeView.addHandlerRender(controlRecipe);
}
init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
