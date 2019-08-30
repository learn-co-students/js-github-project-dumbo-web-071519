const form = document.querySelector("#github-form");
const input = document.querySelector("#search");
const userList = document.querySelector("#user-list");
const repoList = document.querySelector("#repos-list");
const repoButton = document.querySelector("#search-repos");
const userButton = document.querySelector("#search-users");

repoButton.addEventListener('click', searchRepos);
userButton.addEventListener('click', searchUsers);
//form.addEventListener('submit', searchGithub);
userList.addEventListener('click', getRepos);


function searchUsers(event){
    event.preventDefault();
    fetch(`https://api.github.com/search/users?q=${input.value}`)
    .then(res => res.json())
    .then(json => {
        userList.innerHTML = "";
        json.items.forEach(displayUser)
    })
    
}

function displayUser(name){
    form.reset();
    userList.innerHTML += `<li>
    <ol>
    <img src="${name.avatar_url}">
    <li >Username: ${name.login} <button class="user-box" data-repos-url=${name.repos_url} data-username =${name.login}>Show Repos</button></li>
    <li><a target="_blank" href="${name.html_url}">Profile Link</a></li>
    </ol>
    </li>`;
}

function getRepos(event){
    if(event.target.classList.contains("user-box")){
        repoList.innerHTML = `<h2>${event.target.dataset.username}'s Repos</h2>`
        fetch(event.target.dataset.reposUrl)
        .then(res => res.json())
        .then(json => {json.forEach(displayRepo)})
    }
}
function displayRepo(repo){
    repoList.innerHTML += `<li>
    <ol>
        <li>Name: ${repo.name}</li>
        <li><a href=${repo.html_url} target="_blank">Go To Repo</a></li>
    </ol>
    </li>`
}

function searchRepos(event){
    event.preventDefault();
    fetch(`https://api.github.com/search/repositories?q=${input.value}`)
        .then(res => res.json())
        .then(json => {
            repoList.innerHTML = "";
            json.items.forEach(displayRepo)
        })
}