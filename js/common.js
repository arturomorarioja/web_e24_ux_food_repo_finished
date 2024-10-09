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