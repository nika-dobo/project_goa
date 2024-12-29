const cookie = document.cookie.split('; ')
const profile = document.getElementById('profile');

console.log(cookie);
const username = cookie.find(row => row.startsWith('username=')).split('=')[1];
const email = cookie.find(row => row.startsWith('email=')).split('=')[1];

if (cookie) {
    const username = cookie.split('=')[1];
    console.log(username);
    profile.innerText = `Welcome, ${username}`;
}
