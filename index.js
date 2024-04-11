function displayUserName() {
    var email_value = localStorage.getItem('email');
    var formData = {
        email : email_value
    }
    fetch(' https://la82n6dwa7.execute-api.us-east-1.amazonaws.com/Production/main-display-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            var userData = JSON.parse(data.body);
            var username = userData.user_name;
            // Display the username
            document.getElementById("userWelcome").innerText = "Welcome, " + username;
            // Redirect or do something upon successful login
        }
        else {
            // Redirect to the login page
            document.getElementById("userWelcome").innerText = "User not found";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("userWelcome").innerText = "An error occurred. Please try again later.";
    });
}

function displayMusics() {
    fetch('https://1higvw6f6l.execute-api.us-east-1.amazonaws.com/Production/MainDisplayMusics', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            // Parse the JSON body
            var musicData = data.body;

            // Get the container element where music list will be displayed
            var musicListContainer = document.getElementById("musicList");
             // Clear previous content
             musicListContainer.innerHTML = '';

             // Loop through each music item in the data and create <li> elements
             musicData.forEach(function(music) {
                 var listItem = document.createElement("li");
                 listItem.innerHTML = "Title: " + music.title + "<br>" +
                                      "Artist: " + music.artist + "<br>" +
                                      "Year: " + music.year;

                 // Create remove button
                 var removeButton = document.createElement("button");
                 removeButton.textContent = "Remove";
                 removeButton.addEventListener("click", function() {
                     // Remove the corresponding <li> element when the button is clicked
                    //  musicListContainer.removeChild(listItem);
                     // Optionally, you can also send a request to remove the item from the backend
                     // based on its ID or some other identifier
                 });
                 // Append the remove button to the <li> element
                 listItem.appendChild(removeButton);
                 // Append the <li> element to the <ul>
                 musicListContainer.appendChild(listItem);
             });
        } else {
            // Handle error if statusCode is not 200
            console.error('Error:', data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error if fetch fails
    });
}


window.onload = function() {
    displayUserName();
    displayMusics();
}
