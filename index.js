// Check if 'email' is present in localStorage immediately when the script is executed
if (!localStorage.getItem('email')) {
    // If 'email' is not present, redirect to the login page
    window.location.href = 'Login.html';
}

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
    var email_value = localStorage.getItem('email');
    var formData = {
        email : email_value
    }
    fetch('https://1higvw6f6l.execute-api.us-east-1.amazonaws.com/Production/MainDisplayMusics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            // Parse the JSON body
            var musicData = data.body;

            // Get the container element where music list will be displayed
            var musicListContainer = document.getElementById("musicList");
             // Clear previous content
             musicListContainer.innerHTML = '';

             if(musicData.length == 0){
                // var noSubscription = document.createElement("p");
                // noSubscription.innerHTML = "You haven't subscribed any music !";
                // musicListContainer.appendChild(noSubscription);
                document.getElementById("noSubsriptionMessage").innerText = "You haven't subscribed any music !";
            }
            else {
                musicData.forEach(function (music) {
                    var musicItemDiv = document.createElement("div");
                    
                    var img = document.createElement("img");
                    img.src = music.img_url;
                    musicItemDiv.appendChild(img);

                    var titleText = document.createElement("p");
                    titleText.textContent = "Title: " + music.title;
                    musicItemDiv.appendChild(titleText);

                    var artistText = document.createElement("p");
                    artistText.textContent = "Artist: " + music.artist;
                    musicItemDiv.appendChild(artistText);

                    var yearText = document.createElement("p");
                    yearText.textContent = "Year: " + music.year;
                    musicItemDiv.appendChild(yearText);

                    // Create remove button
                    var removeButton = document.createElement("button");
                    removeButton.textContent = "Remove";
                    removeButton.addEventListener("click", function () {
                        removeMusic(music, musicItemDiv);
                    });
                    musicItemDiv.appendChild(removeButton);

                    // Append the <div> element to the container
                    musicListContainer.appendChild(musicItemDiv);
                });
            }
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

function removeMusic(data, div){
    var formData = {
        title : data.title,
        artist : data.artist
    }
    fetch('https://1higvw6f6l.execute-api.us-east-1.amazonaws.com/Production/MainDeleteMusic', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            // Display the username
            div.remove();
            document.getElementById("noSubsriptionMessage").innerText = "You haven't subscribed any music !";
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

function query(){
    var title = document.getElementById("title").value;
    var year = document.getElementById("year").value;
    var artist = document.getElementById("artist").value;
    if (year !== "") {
        year = parseInt(year);
    }
    var formData = {
        title : title,
        year : year,
        artist : artist
    };
    fetch('https://1higvw6f6l.execute-api.us-east-1.amazonaws.com/Production/MainQueryMusics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            // Parse the JSON body
            var musicData = data.body;

            // Get the container element where music list will be displayed
            var musicListContainer = document.getElementById("musicQueryList");
             // Clear previous content
             musicListContainer.innerHTML = '';

             if(musicData.length == 0){
                var noSubscription = document.createElement("p");
                noSubscription.innerHTML = "No result is retrieved. Please query again";
                musicListContainer.appendChild(noSubscription);
            }
            else {
                musicData.forEach(function (music) {
                    var musicItemDiv = document.createElement("div");
                    
                    var img = document.createElement("img");
                    img.src = music.img_url;
                    musicItemDiv.appendChild(img);

                    var titleText = document.createElement("p");
                    titleText.textContent = "Title: " + music.title;
                    musicItemDiv.appendChild(titleText);

                    var artistText = document.createElement("p");
                    artistText.textContent = "Artist: " + music.artist;
                    musicItemDiv.appendChild(artistText);

                    var yearText = document.createElement("p");
                    yearText.textContent = "Year: " + music.year;
                    musicItemDiv.appendChild(yearText);

                    // Create remove button
                    var subscribeButton = document.createElement("button");
                    subscribeButton.textContent = "Subscribe";
                    subscribeButton.addEventListener("click", function () {
                        subscribeMusic(music);
                    });
                    musicItemDiv.appendChild(subscribeButton);

                    // Append the <div> element to the container
                    musicListContainer.appendChild(musicItemDiv);
                    document.getElementById("noSubsriptionMessage").remove;
                });
            }
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

function subscribeMusic(music){    
    var artist = music.artist;
    var title = music.title;
    var year = music.year;
    var email = localStorage.getItem('email');
    var formData = {
        email: email,
        artist: artist,
        title: title,
        year : year
    };

    fetch(' https://1higvw6f6l.execute-api.us-east-1.amazonaws.com/Production/MainSubscribeMusic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode == 200) {
            document.getElementById("subscribeMessage").innerText = "Subscribe successful!";
            var musicListContainer = document.getElementById("musicList");
            var musicItemDiv = document.createElement("div");
                    
            var img = document.createElement("img");
            img.src = music.img_url;
            musicItemDiv.appendChild(img);

            var titleText = document.createElement("p");
            titleText.textContent = "Title: " + music.title;
            musicItemDiv.appendChild(titleText);

            var artistText = document.createElement("p");
            artistText.textContent = "Artist: " + music.artist;
            musicItemDiv.appendChild(artistText);

            var yearText = document.createElement("p");
            yearText.textContent = "Year: " + music.year;
            musicItemDiv.appendChild(yearText);

            // Create remove button
            var removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", function () {
            removeMusic(music, musicItemDiv);
            });
            musicItemDiv.appendChild(removeButton);

            // Append the <div> element to the container
            musicListContainer.appendChild(musicItemDiv)

        } else {
            // Redirect to the login page
            document.getElementById("subscribeMessage").innerText = "The music already exists.";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("registerMessage").innerText = "An error occurred. Please try again later.";
    });
}

document.getElementById('logoutLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior of the link
    // Clear localStorage
    localStorage.removeItem('email');
    // Redirect to the login page
    window.location.href = 'Login.html';
});

window.onload = function() {
    displayUserName();
    displayMusics();
}
