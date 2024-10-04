import { baseUrl, handleAPIError } from './common.js';

const NUM_RECIPES_TO_SHOW = 10;

// We grab the container for the recipe card
const recipeInfoSection = document.querySelector('#recipe-cards');

const handleRecipe = function(data) {
    const recipe = data.meals[0];

    const recipeCard = document.createElement('article');
    recipeCard.innerHTML = `
        <header>
            <h3><a href="recipe.htm?id=${recipe.idMeal}">${recipe.strMeal}</a></h3>
        </header>
        <a href="recipe.htm?id=${recipe.idMeal}"><img src="${recipe.strMealThumb}" alt=""></a>
        <div>
            <p class="pill foodType">${recipe.strCategory}</p>
            <p class="pill area">${recipe.strArea}</p>
        </div>
    `;

    document.querySelector('section#recipe-cards').append(recipeCard);        
}

for (let index = 0; index < NUM_RECIPES_TO_SHOW; index++) {
    fetch(`${baseUrl}/random.php`)
    .then(handleAPIError)
    .then(handleRecipe)
    .catch((error) => {
        recipeInfoSection.innerHTML = `
            <h3>Error</h3>
            <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
            <p class="error">${error}</p>
        `;
    })
}