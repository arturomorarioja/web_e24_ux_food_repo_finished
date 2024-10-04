import { handleCloseDialogButton } from './nav.js';

document.querySelector('#frmContact').addEventListener('submit', (e) => {
    e.preventDefault();

    document.querySelector('#msgInfoSent').showModal();

    e.target.reset();
});

document.querySelector('#msgInfoSent .close').addEventListener('click', handleCloseDialogButton);