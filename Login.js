document.getElementById('Submit').onclick = login;

function login(event) {
    event.preventDefault();
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    fetch('https://replit.com/@giopro1986/Server/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password, email: email }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 'failure') {
            alert(data.message);
        } else if (data.status === 'success') {
            alert('Login successful');
            let userData= JSON.parse(data.Data);
            document.cookie = `username=${userData.username}; path=/`;
            document.cookie = `password=${userData.password}; path=/`;
            document.cookie = `email=${userData.email}; path=/`;
            document.cookie = `id=${userData.id}; path=/`;
            console.log(document.cookie);
        } else {
            alert('Login failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}