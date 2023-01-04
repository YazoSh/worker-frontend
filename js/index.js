const loggedIn = document.getElementById('loggedin')
const notLoggedIn = document.getElementById('notLoggedin')
const greetingName = document.getElementById('greeting')
const logoutBtn = document.getElementById('logoutBtn')

const jobList = document.getElementById('jobList')

const searchInput = document.getElementById('searchInput')
const searchJobLevel = document.getElementById('jobLevel')
const searchjobLocation = document.getElementById('jobLocation')
const searchBtn = document.getElementById('searchBtn')

const app = new Application('http://localhost:3000')

const htmlToElement = (html) => {
    var template = document.createElement('template')
    html = html.trim() // Never return a text node of whitespace as the result
    template.innerHTML = html
    return template.content.firstChild
}

const timeFormat = new Intl.DateTimeFormat("en-GB", {
    year: 'numeric', month: 'numeric', day: 'numeric',
    timeZone: 'Asia/Amman'
})

const renderJobs = (jobs) => {
    // Clears Job container
    jobList.replaceChildren()
    for (const job of jobs) {
        const jobElem = htmlToElement(
            `<div class="job-card">
                    <div class="job-name">
                        <img class="job-profile" src="images/bigLogo.png">
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
                        Posted on ${timeFormat.format(new Date(job.datePosted))}
                    </div>
                </div>`)
        jobElem.addEventListener('click', () => {
            location.href=`job.html?jobId=${job.id}`
        })
        jobList.appendChild(jobElem)
    }
}

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

searchBtn.addEventListener('click', (e) => {
    app.getJobs({
        title: searchInput.value,
        careerLevel: searchJobLevel.value,
        location: searchjobLocation.value
    }).then(renderJobs)
})

app.getJobs().then(renderJobs)