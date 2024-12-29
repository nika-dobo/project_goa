document.getElementById('submit').onclick = signup;

function signup(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const firstName = document.getElementById('name').value;
    const lastName = document.getElementById('surename').value;
    const dateOfBirth = document.getElementById('date').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const PasswordRepeat = document.getElementById('repeat-password').value;

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    if (PasswordRepeat === "") {
        alert('repeat Password is required');
        return;
    }
    if (password !== PasswordRepeat) {
        alert('Passwords do not match');
        return;
    }
    if (!email.includes('@')) {
        alert('Invalid email address');
        return;
    }

    const userData = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        password: password,
        email: email
    };

    fetch('http://127.0.0.1:5500/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 'fail') {
            alert(data.message);
        } else if (data.status === 'success') {
            alert('Sign-up successful');
        } else {
            alert('Sign-up failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}