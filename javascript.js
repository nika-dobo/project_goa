//Login Code

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const user = data.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Sign-Up Code

function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const userExists = data.users.some((user) => user.username === username);
      if (userExists) {
        alert("Username already exists");
      } else {
        data.users.push({ username: username, password: password });

        fetch("Python.y", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              alert("Sign-up successful");
            } else {
              alert("Sign-up failed");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
