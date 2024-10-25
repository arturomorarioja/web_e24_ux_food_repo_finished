import { baseUrl, handleAPIError, handleFetchCatchError, handleRecipeCard } from './common.js';

/**
 * Ten random recipes are shown in the homepage
 */
const NUM_RECIPES_TO_SHOW = 10;

for (let index = 0; index < NUM_RECIPES_TO_SHOW; index++) {
    fetch(`${baseUrl}/random.php`)
    .then(handleAPIError)
    .then(handleRecipeCard)
    .catch(handleFetchCatchError);
}