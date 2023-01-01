const loggedIn = document.getElementById('loggedin')
const notLoggedIn = document.getElementById('notLoggedin')
const greetingName = document.getElementById('greeting')
const logoutBtn = document.getElementById('logoutBtn')

const jobList = document.getElementById('jobList')

function htmlToElement(html) {
    var template = document.createElement('template')
    html = html.trim() // Never return a text node of whitespace as the result
    template.innerHTML = html
    return template.content.firstChild
}

const app = new Application('http://localhost:3000')

app.getUser().then((user) => {
    if (!user) {
        loggedIn.hidden = true
        notLoggedIn.hidden = false
        return
    }
    loggedIn.hidden = false
    notLoggedIn.hidden = true
    greetingName.innerText = 'Hello, ' + user.name
})

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault()
    app.logout()
    location.reload()
})

app.getJobs().then((jobs) => {
    for (const job of jobs) {
        const jobElem = htmlToElement(
            `<div class='job post'>
                <div class="job-card">
                    <div class="job-name">
                        <img class="job-profile" src="images/job-list1.png">
                        <div class="job-detail">
                            <h4>${job.company.name}</h4>
                            <h3>${job.title}</h3>
                            <p>${job.description.substring(0, 30)}...</p>
                        </div>
                    </div>
                    <div class="job-label">
                        <a class="label-a" href="#">${job.industry}</a>
                        <a class="label-a" href="#">${job.careerLevel}</a>
                        <a class="label-a" href="#">${job.location}</a>
                    </div>
                    <div class="job-posted">
                        Posted 2 mins ago
                    </div>
                </div>
            </div>`)
        jobList.appendChild(jobElem)
    }
})
