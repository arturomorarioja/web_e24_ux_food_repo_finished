import { baseUrl, handleAPIError, handleFetchCatchError, baseUserUrl, handleRecipeCard, loggedUserID } from './common.js';

/**
 * Gets the favourite recipe ID for the current user from the user API,
 * then gets information for each favourited recipe from the Meal DB API
 */
fetch(`${baseUserUrl}/users/${loggedUserID()}/favourites`)
.then(handleAPIError)
.then(data => {
    if (data.recipes.length === 0) {
        const message = document.createElement('p');
        message.innerText = 'This user has not marked any recipe as favourite yet.';
        document.querySelector('#recipe-cards').append(message);
    } else {
        data.recipes.forEach((recipe) => {
            fetch(`${baseUrl}/lookup.php?i=${recipe.recipe_id}`)
            .then(handleAPIError)
            .then(handleRecipeCard)
            .catch(handleFetchCatchError);
        });
    }
})
.catch(handleFetchCatchError);