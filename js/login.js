import { baseUserUrl } from './common.js';

const loadFavourites = (userID) => {
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

document.querySelector('#frmLogin').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    fetch(`${baseUserUrl}/validation`, {
        method: 'POST',
        body: params
    })
    .then(response => response.json())
    .then(data => {
        if (Object.keys(data).includes('user_id')) {
            sessionStorage.setItem('food_repo_user_id', data.user_id);
            loadFavourites(data.user_id);
        } else {
            throw new Error(data.error);
        }
    })
    .catch((error) => {
        document.querySelector('section').innerHTML = `
            <h3>Error</h3>
            <p>Dear user, we are truly sorry to inform that there was an error while processing the data</p>
            <p class="error">${error}</p>
        `;        
    })
});