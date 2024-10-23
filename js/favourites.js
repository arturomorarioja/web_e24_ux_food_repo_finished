import { baseUrl, handleAPIError } from './common.js';
import { baseUserUrl, handleRecipeCard } from './common.js';

const userID = sessionStorage.getItem('food_repo_user_id');

fetch(`${baseUserUrl}/users/${userID}/favourites`)
.then(handleAPIError)
.then(data => {
    console.log(data);
    data.recipes.forEach((recipe) => {
        fetch(`${baseUrl}/lookup.php?i=${recipe.recipe_id}`)
        .then(handleAPIError)
        .then(handleRecipeCard)
        .catch((error) => {
            document.querySelector('section').innerHTML = `
                <h3>Error</h3>
                <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
                <p class="error">${error}</p>
            `;
        })
    });
});