// Main Variables

let theInput = document.querySelector(".get-repos input")
let getButton = document.querySelector(".get-button")
let reposData = document.querySelector(".show-data")

getButton.onclick = function () {
    
    getRepos()
} 

// Get repos function
function getRepos() {

    if (theInput.value == "") {
        
        reposData.innerHTML = `<span>Please Write GitHub UserName</span>`
    } else {
        
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((res) => res.json())
        .then((repos) =>{

            // empty the container
            reposData.innerHTML = ""

            //Loop on repos
            repos.forEach(repo => {

                //create main div
                let mainDiv = document.createElement("div")

                //create repo name text span
                let repoNameparagraph = document.createElement('p')

                let reponame = document.createTextNode(repo.name)

                repoNameparagraph.appendChild(reponame)

                // append the text to main div
                mainDiv.appendChild(repoNameparagraph)

                // create repo url
                let theUrl = document.createElement('a')

                //create repo url text
                let theUrlText = document.createTextNode("Visit")

                // append url text to the url
                theUrl.appendChild(theUrlText)

                //add the href
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`

                //set target blank
                theUrl.setAttribute('target' , '_blank')

                //append anchor tomain div
                mainDiv.appendChild(theUrl)

                //create stars count
                let starsSpan = document.createElement('span')

                // create the stars text
                let starsText =document.createTextNode(`Stars ${repo.stargazers_count}`)

                // add star count to span
                starsSpan.appendChild(starsText)

                //append stars count span to main div
                mainDiv.appendChild(starsSpan)

                // add class on main div
                mainDiv.className = 'repo-box'

                // append the main div to conatainer
                reposData.appendChild(mainDiv)
            });
        })
    }
}