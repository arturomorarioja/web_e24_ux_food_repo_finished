import { baseUrl, baseUserUrl, handleAPIError } from './common.js';

const nonFavourited = '&#9734;';
const favourited = '&#9733';

const recipeInfoSection = document.querySelector('#recipe-info');

let recipeID = new URLSearchParams(window.location.search);
recipeID = recipeID.get('id');

const handleRecipe = (data) => {
    const recipe = data.meals[0];

    const MAX_INGREDIENTS = 20;
    let recipeInfo = `
        <header>
            <h2>${recipe.strMeal}</h2>
            <button class="favourite">${nonFavourited}</button>
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

        handleFavouriting();
    });
};

/**
 * Favourite/unfavourite recipe
 */
const handleFavouriting = () => {
    document.querySelector('.favourite').addEventListener('click', function(e) {
        e.preventDefault();
        
        // if (this.innerHTML === '☆') {
            const userID = sessionStorage.getItem('food_repo_user_id');
            const params = new URLSearchParams();
            const method = this.innerHTML === '☆' ? 'POST' : 'DELETE';
            params.append('recipe_id', recipeID);
            
            fetch(`${baseUserUrl}/users/${userID}/favourites`, {
                method: method,
                body: params
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'ok') {
                    if (method === 'POST') {
                        this.innerHTML = favourited;
                    } else {                        
                        this.innerHTML = nonFavourited;
                    }
                    //// remove from sessionStorage (reload all favourites)
                } else {
                    throw new Error(data.error);
                }
            })
            .catch((error) => {
                recipeInfoSection.innerHTML = `
                    <h3>Error</h3>
                    <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
                    <p class="error">${error}</p>
                `;
            });

        // } else {
        //     this.innerHTML = nonFavourited;
        // }
    });
}

fetch(`${baseUrl}//lookup.php?i=${recipeID}`)
.then(handleAPIError)
.then(handleRecipe)
.catch((error) => {
    recipeInfoSection.innerHTML = `
        <h3>Error</h3>
        <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
        <p class="error">${error}</p>
    `;
});