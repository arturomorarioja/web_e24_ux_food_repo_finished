import { baseUserUrl, loadFavourites, handleAPIError, handleFetchCatchError } from './common.js';

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
    .then(handleAPIError)
    .then(data => {
        if (Object.keys(data).includes('user_id')) {
            sessionStorage.setItem('food_repo_user_id', data.user_id);
            // As loadFavourites returns a promise, it can be treated asynchronously, 
            // making the page redirection wait until loadFavourites is finished
            loadFavourites(data.user_id).then(() => {
                window.location.href = 'index.html';
            });
        } else {
            throw new Error(data.error);
        }
    })
    .catch(handleFetchCatchError);
});