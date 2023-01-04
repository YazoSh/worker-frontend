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

const app = new Application('http://localhost:3000')

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
    year: 'numeric', month: 'numeric', day: 'numeric',
    timeZone: 'Asia/Amman'
})

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
            if (job.company.id === user.company.id) {
                applyBtnCont.hidden = true
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