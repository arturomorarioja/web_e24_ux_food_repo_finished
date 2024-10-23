import { baseUrl, handleAPIError, handleRecipeCard } from './common.js';

const NUM_RECIPES_TO_SHOW = 10;

// We grab the container for the recipe card
const recipeInfoSection = document.querySelector('#recipe-cards');

for (let index = 0; index < NUM_RECIPES_TO_SHOW; index++) {
    fetch(`${baseUrl}/random.php`)
    .then(handleAPIError)
    .then(handleRecipeCard)
    .catch((error) => {
        recipeInfoSection.innerHTML = `
        <h3>Error</h3>
        <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
        <p class="error">${error}</p>
        `;
    })
}