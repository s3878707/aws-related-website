function submitForm(event) {
    event.preventDefault(); // Prevent default form submission
    
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var formData = {
        email: email,
        username: username,
        password: password
    };

    fetch(' https://kak2x1n7jc.execute-api.us-east-1.amazonaws.com/Production/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            window.location.href = "Login.html";
        } else {
            // Redirect to the login page
            document.getElementById("registerMessage").innerText = "The email already exists.";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("registerMessage").innerText = "An error occurred. Please try again later.";
    });
}
