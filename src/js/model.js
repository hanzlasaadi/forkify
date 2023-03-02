import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
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
    console.log(state.recipe);
  } catch (err) {
    // console.error(err, 'Model.js');
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJson(`${API_URL}?search=${query}`);
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
