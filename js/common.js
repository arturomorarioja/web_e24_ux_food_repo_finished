export const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
export const baseUserUrl = 'http://localhost:8001';

export const handleAPIError = (response) => {
    if (response.ok) {
        return response.json();
    }
    console.log('There was an error');
}

export const handleFetchCatchError = (error) => {
    const errorSection = document.createElement('section');
    errorSection.innerHTML = `
        <header>    
            <h3>Error</h3>
        </header>
        <p>Dear user, we are truly sorry to inform that there was an error while getting the data</p>
        <p class="error">${error}</p>
    `;
    document.querySelector('main').append(errorSection);
}

export const loggedUserID = () => {
    return sessionStorage.getItem('food_repo_user_id') || 0;
}

/**
 * Logout
 */
export const logout = () => {
    sessionStorage.removeItem('food_repo_user_id');
    sessionStorage.removeItem('food_repo_favourites');
    window.location.href = 'index.html';
}

/**
 * Creates and displays a recipe card
 */
export const handleRecipeCard = function(data) {
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

/**
 * Loads favourites in sessionStorage
 */
export const loadFavourites = async (userID) => {
    // A promise is returned, so that it can be treated asynchronously by the caller
    return fetch(`${baseUserUrl}/users/${userID}/favourites`)
        .then(handleAPIError)
        .then(data => {
            sessionStorage.setItem('food_repo_favourites', JSON.stringify(data.recipes));
        })
        .catch(handleFetchCatchError);
}

/**
 * Returns true if the recipe whose ID it receives is the user's favourite, false otherwise
 */
export const isFavourite = (recipeID) => {
    const favourites = JSON.parse(sessionStorage.getItem('food_repo_favourites'));
    return favourites.find((recipe) => recipe.recipe_id === parseInt(recipeID)) !== undefined;
}