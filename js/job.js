const title = document.getElementById('title')
const company = document.getElementById('company')
const jobDetailsCompany = document.getElementById('jobDetailsCompany')
const jobLocation = document.getElementById('location')
const datePosted = document.getElementById('datePosted')
const level = document.getElementById('level')
const description = document.getElementById('description')
const id = document.getElementById('id')
const industry = document.getElementById('industry')
const applyBtn = document.getElementById('applyBtn')
const applyBtnCont = document.getElementById('applyBtnCont')
const applicantsList = document.getElementById('applicantsList')
const applicantsSection = document.getElementById('applicants-section')

const app = new Application('http://localhost:3000')

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
    year: 'numeric', month: 'numeric', day: 'numeric',
    timeZone: 'Asia/Amman'
})

const htmlToElement = (html) => {
    var template = document.createElement('template')
    html = html.trim() // Never return a text node of whitespace as the result
    template.innerHTML = html
    return template.content.firstChild
}

const renderApplicants = (applicants) => {
    for (const a of applicants) {
        const userElem = htmlToElement(
            `<div class="job-card">
                    <div class="job-name">
                        <img class="job-profile" src="images/network.png">
                        <div class="job-detail">
                            <h3>${a.name}</h3>
                            <p>${a.email}</p>
                        </div>
                    </div>
                    <div class="job-posted">
                        <button class="button" data-userid="${a.id}" data-name="${a.name}">CV</button>
                    </div>
            </div>`)
        applicantsList.appendChild(userElem)
    }
}

const saveBlob = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

app.getJobById(params.jobId).then((job) => {
    title.innerText = job.title
    company.innerText = job.company.name + ' . '
    jobDetailsCompany.innerText = job.company.name
    jobLocation.innerText = job.location + ' . '
    datePosted.innerText = timeFormat.format(new Date(job.datePosted))
    level.innerText = job.careerLevel
    industry.innerText = job.industry
    description.innerText = job.description
    id.innerText = `Job ID: ${job.id}`

    app.getUser().then((user) => {
        if (!user) {
            applyBtn.addEventListener('click', () => {
                location.href = "login.html"
            })
            return
        } else {
            if (user.company && job.company.id === user.company.id) {
                applyBtnCont.hidden = true
                applicantsSection.hidden = false
                app.getJobApplicants(params.jobId).then(renderApplicants)
                return
            }
        }

        app.checkApplied(params.jobId).then((resp) => {
            if (resp.applied) {
                applyBtnCont.classList.remove('apply')
                applyBtnCont.classList.add('applied')
                applyBtn.innerText = 'Applied'
            } else {
                applyBtn.addEventListener('click', () => {
                    app.applyToJob(job.id).then(() => {
                        location.reload()
                    })
                })
            }
        })
    })
})

applicantsList.addEventListener('click', async (e) => {
    if (e.target.classList[0] !== 'button') return

    const userId = e.target.dataset.userid
    const userName = e.target.dataset.name

    if (!(await app.hasCV(userId)).hasCV) {
        alert("User doesn't have a CV")
        return
    }

    app.getCV(userId).then((blob) => saveBlob(blob, `cv-${userName}-${userId}.pdf`))
})
