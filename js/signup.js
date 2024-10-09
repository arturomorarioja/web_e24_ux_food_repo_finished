import { baseUserUrl, handleAPIError } from './common.js';

document.querySelector('#frmSignup').addEventListener('submit', (e) => {
    e.preventDefault();

    const password = e.target.txtPassword.value.trim();
    const repeatPassword = e.target.txtRepeatPassword.value.trim();

    if (password !== repeatPassword) {
        alert('Passwords must match');
        return false;
    }

    const firstName = e.target.txtFirstname.value.trim();
    const lastName = e.target.txtLastname.value.trim();
    const email = e.target.txtEmail.value.trim();

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('first_name', firstName);
    params.append('last_name', lastName);
    params.append('password', password);

    fetch(`${baseUserUrl}/users`, {
        method: 'POST',
        body: params
    })
    .then(response => response.json())
    .then(data => {
        if (Object.keys(data).includes('user_id')) {
            window.location.href = 'login.htm';
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
    });
});