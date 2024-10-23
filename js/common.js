export const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
export const baseUserUrl = 'http://localhost:8001';

export const handleAPIError = (response) => {
    if (response.ok) {
        return response.json();
    }
    console.log('There was an error');
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