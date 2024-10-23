export const handleRecipe = function(data) {
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