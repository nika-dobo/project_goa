console.log('global.js loaded');
const cookie = document.cookie.split('; ').find(row => row.startsWith('username='));
const profile = document.getElementById('profile');

console.log(cookie);

if (cookie) {
    const username = cookie.split('=')[1];
    console.log(username);
    profile.innerText = `Welcome, ${username}`;
}
