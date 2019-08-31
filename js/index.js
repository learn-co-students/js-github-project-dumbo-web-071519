// Accept: application/vnd.github.v3+json

const usersDiv = document.getElementById("user-list")
const repoDiv = document.getElementById("repos-list")

const config = {
  headers: {
    "Accept": "application/vnd.github.v3+json"
  }
}

// USER SEARCH ENDPOINT
const form = document.getElementById("github-form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  formInput = e.target.children[0].value
  console.log("form input: ", formInput)

  fetch(`https://api.github.com/search/users?q=${formInput}`, config)
  .then(response => response.json())
  .then(getUserSearchResults)
})

function getUserSearchResults(userList) {
  usersDiv.innerText = ""

  userList.items.forEach((user) => {
    const userDiv = document.createElement("div")
    userDiv.id = `id-${user.id}`
    userDiv.innerText = user.login
    usersDiv.appendChild(userDiv)
  })
}



// User Repos Endpoint
// fetch("https://api.github.com/users/octocat/repos", config)
// .then(response => response.json())
// .then(response => console.log("repo endpoint: ", response))
