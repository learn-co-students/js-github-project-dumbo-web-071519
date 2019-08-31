document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.querySelector('#github-form')
    const userContainer = document.querySelector('#user-list')
    const userRepoList = document.querySelector('#repos-list')

    githubForm.addEventListener('click', (e) =>{
        e.preventDefault()
        //console.log(e)
        if (e.target.name === "users" && e.target.name !== 'search'){
            //console.dir(e.target.previousElementSibling.value)
            if (e.target.previousElementSibling.value === "") return;
            let user = e.target.previousElementSibling.value
            getUsers(user)
            // fetch(`https://api.github.com/search/users?q=${query}`)
            // .then(res => res.json())
            // .then(data => displayUsers(data.items))
        }
        else if (e.target.name === "repos"){
            let query = e.target.form[0].value
            getSearchRepos(query)
        }
    })

    userContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('user_profile')){
            getUserRepos(e.target.id)
        }
    })

    function displayUsers(arr) {
        arr.forEach((user) => {
            userContainer.innerHTML += createDiv(user)
        })
    }
    function createDiv(user) {
        return `
            <li class="user_profile" id=${user.login}>
                <img src=${user.avatar_url}/>
                <span>${user.login}</span>
                <a href=${user.html_url}>Github Profile</a>
            </li>
        `
    }

    function getUsers(user){
        fetch(`https://api.github.com/search/users?q=${user}`)
            .then(res => res.json())
            .then(data => displayUsers(data.items))
    }

    function getUserRepos(user) {
        fetch(`https://api.github.com/users/${user}/repos`)
        .then(resp => resp.json())
        .then((repos) => {
            userRepoList.innerHTML = ""
            userRepoList.innerHTML += `<h3>${user}'s Repos</h3`
            repos.forEach((repo) => {
                userRepoList.innerHTML += `
                    <li><a href=${repo.html_url} target="__blank">${repo.name}</a></li>
                `
            })
        })
    }

    function getSearchRepos(query) {
        fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then(resp => resp.json())
        .then(repos => {
            userContainer.innerHTML = ""
            userRepoList.innerHTML = `<h3>Search results from: ${query}</h3`
            repos.items.forEach((repo) => {
                userRepoList.innerHTML += `
                    <li><a href=${repo.html_url} target="__blank">${repo.name}</a> by: <strong>${repo.owner.login}</strong></li>
                `
            })
        })
    }
})