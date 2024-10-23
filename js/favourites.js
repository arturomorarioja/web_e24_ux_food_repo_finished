import { baseUrl, handleAPIError } from './common.js';
import { baseUserUrl } from './common.js';
import { handleRecipe } from './recipeCard.js';

const userID = sessionStorage.getItem('food_repo_user_id');

fetch(`${baseUserUrl}/users/${userID}/favourites`)
.then(handleAPIError)
.then(data => {
    console.log(data);
    data.recipes.forEach((recipe) => {
        fetch(`${baseUrl}/lookup.php?i=${recipe.recipe_id}`)
        .then(handleAPIError)
        .then(handleRecipe)
        .catch((error) => {
            recipeInfoSection.innerHTML = `
                <h3>Error</h3>
                <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
                <p class="error">${error}</p>
            `;
        })
    });
});

export const loadFavourites = (userID) => {
    fetch(`${baseUserUrl}/users/${userID}/favourites`)
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem('food_repo_favourites', JSON.stringify(data.recipes));

        window.location.href = 'index.html';
    })
    .catch(error => {
        document.querySelector('section').innerHTML = `
            <h3>Error</h3>
            <p>Dear user, we are truly sorry to inform that there was an error while processing the data</p>
            <p class="error">${error}</p>
        `;        
    });
}