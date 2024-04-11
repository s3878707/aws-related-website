function submitForm(event) {
    event.preventDefault(); // Prevent default form submission
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    var formData = {
        email: email,
        password: password
    };

    fetch('https://jgj1t41e0c.execute-api.us-east-1.amazonaws.com/Production/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            document.getElementById("loginMessage").innerText = "Login successful!";
            window.location.href = "index.html";
            // Redirect or do something upon successful login
        } 
            else {
                document.getElementById("loginMessage").innerText = "Login failed. Please try again.";
            }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("loginMessage").innerText = "An error occurred. Please try again later.";
    });
}
