const cookie = document.cookie.split('; ')
const profile = document.getElementById('profile');

const usernameInfo = document.getElementById('usernameInfo');
const emailInfo = document.getElementById('emailInfo');

console.log(cookie);
const username = cookie.find(row => row.startsWith('username=')).split('=')[1];
const email = cookie.find(row => row.startsWith('email=')).split('=')[1];

if (cookie) {
    console.log(username);
    profile.innerText = `Welcome, ${username}`;
}

if (usernameInfo && emailInfo) {
    usernameInfo.innerText = `${username}`;
    emailInfo.innerText = `${email}`;
}
        