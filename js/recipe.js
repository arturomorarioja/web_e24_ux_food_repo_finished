import { baseUrl, handleAPIError } from './common.js';

const recipeInfoSection = document.querySelector('#recipe-info');

let recipeID = new URLSearchParams(window.location.search);
recipeID = recipeID.get('id');

const handleRecipe = (data) => {

    const recipe = data.meals[0];

    const MAX_INGREDIENTS = 20;
    let recipeInfo = `
        <header>
            <h2>${recipe.strMeal}</h2>
        </header>
        <img src="${recipe.strMealThumb}" alt="">
        <p>${recipe.strInstructions}</p>
        <section>
            <header>
                <h3>Ingredients</h3>
            </header>
            <ul>
    `;
    for (let index = 0; index < MAX_INGREDIENTS; index++) {
        const ingredient = recipe[`strIngredient${index + 1}`];
        if (ingredient !== null && ingredient !== '') {
            const measure = recipe[`strMeasure${index + 1}`];
            recipeInfo += `<li>${ingredient}, ${measure}</li>`;
        }
    }
    recipeInfo += `
            </ul>
        </section>
    `;

    let youtubeID = recipe.strYoutube;
    youtubeID = youtubeID.substring(youtubeID.length - 11);

    const thumbnail = new Image();
    thumbnail.src = `http://img.youtube.com/vi/${youtubeID}/mqdefault.jpg`;

    thumbnail.addEventListener('load', function() {
        console.log('Here');
        if (this.width !== 120) {
            recipeInfo += `
                <iframe 
                    src="https://www.youtube.com/embed/${youtubeID}?si=MO0O8ATQ_yYp_1wR" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
            `;
        }
        recipeInfoSection.innerHTML = recipeInfo; 
    });
};

fetch(`${baseUrl}//lookup.php?i=${recipeID}`)
.then(handleAPIError)
.then(handleRecipe)
.catch((error) => {
    recipeInfoSection.innerHTML = `
        <h3>Error</h3>
        <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
        <p class="error">${error}</p>
    `;
})