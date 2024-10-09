import { baseUserUrl } from './common.js';

const userID = sessionStorage.getItem('food_repo_user_id');

fetch(`${baseUserUrl}/users/${userID}/favourites`)
.then(response => response.json())
.then(data => {
    let recipes = '<ul>'
    data.recipes.forEach((recipe) => {
        recipes += `<li>${recipe.recipe_id}</li>`;
    });
    recipes += '</ul>'
    document.querySelector('#favourites').innerHTML = recipes;
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