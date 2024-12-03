async function fetchData(endpoint) {
    try {
       const data = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
       const json = await data.json();
       return json;
    } catch (error) {
       console.log(error.message);
       return null;
    }
 }

 async function displayUsers() {
    const users = await fetchData("users");
    const userContainer = document.getElementById("user-container");
    const postContainer = document.getElementById("post-container");
    
    userContainer.innerHTML = ""; // Clear existing content
    postContainer.classList.remove("visible"); // Hide posts
    userContainer.classList.add("visible"); // Show users

    if (users) {
       users.forEach(user => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
             <h3>${user.name}</h3>
             <p><strong>Email:</strong> ${user.email}</p>
             <p><strong>Phone:</strong> ${user.phone}</p>
             <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
          `;
          userContainer.appendChild(card);
       });
    } else {
       userContainer.textContent = "Failed to load users.";
    }
 }

 async function displayPosts() {
    const posts = await fetchData("posts");
    const postContainer = document.getElementById("post-container");
    const userContainer = document.getElementById("user-container");
    
    postContainer.innerHTML = ""; // Clear existing content
    userContainer.classList.remove("visible"); // Hide users
    postContainer.classList.add("visible"); // Show posts

    if (posts) {
       posts.forEach(post => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
             <h3>${post.title}</h3>
             <p>${post.body}</p>
          `;
          postContainer.appendChild(card);
       });
    } else {
       postContainer.textContent = "Failed to load posts.";
    }
 }

 // Attach event listeners to buttons
 document.getElementById("load-users").addEventListener("click", displayUsers);
 document.getElementById("load-posts").addEventListener("click", displayPosts);