import { async } from 'regenerator-runtime';
import { API_URL, ResultsPerPage } from './config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    results: [],
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // const res = await fetch(`${API_URL}${id}`);
    // const data = await res.json();
    // if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    const data = await getJson(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
    };

    //it checks the current recipe against the recipes in the bookmarks array and set the BOOKMARKED value to true.
    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
  } catch (err) {
    // console.error(err, 'Model.js');
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    // setting page # to one when new results are loaded
    state.search.page = 1;

    // ajax call for search results
    const data = await getJson(`${API_URL}?search=${query}`);

    //updating state
    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    console.log(err, 'search results are fucked');
    throw err;
  }
};

export const displayResultsPerPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * ResultsPerPage;
  const end = page * ResultsPerPage;
  // console.log(state.search.results.slice(start, end));

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //add Current recipe to bookmarks array
  state.bookmarks.push(recipe);

  //the recipe must have the booleaan bookmarkes value set to true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // set bookmarks to local storage
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(rec => rec.id === id);

  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // set bookmarks to local storage
  persistBookmarks();
};

const init = function () {
  const localData = localStorage.getItem('bookmarks');
  if (!localData) return;
  state.bookmarks = JSON.parse(localData);
};
init();
