/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup, passwordForgot, passwordReset } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const signupForm = document.getElementById('signup-form');
const passwordForgotForm = document.querySelector('#passwordForgotForm');
const passwordResetForm = document.querySelector('#passwordResetForm');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (logOutBtn)
  logOutBtn.addEventListener('click', e => {
    const nav = document.querySelector('.navigation');

    nav.style.display = 'none';
    logout();
  });

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'Your informations have been');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'Password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 15);

if (passwordForgotForm) {
  passwordForgotForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.querySelector('#passwordForgotEmail').value;

    passwordForgot(email);
  });
}

if (passwordResetForm) {
  passwordResetForm.addEventListener('submit', e => {
    e.preventDefault();

    const token = document.querySelector('#passwordResetToken').value;
    const password = document.querySelector('#newPassword').value;
    const passwordConfirm = document.querySelector('#newPasswordConfirm').value;

    passwordReset(token, password, passwordConfirm);
  });
}
