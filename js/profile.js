const fullname = document.getElementById('fullname')
const email = document.getElementById('email')
const cv = document.getElementById('cv')
const fileUploadBtn = document.getElementById('fileUploadBtn')
const cvUpload = document.getElementById('file')
const companyName = document.getElementById('companyName')
const jobList = document.getElementById('jobList')

const companySection = document.getElementById('company-section')
const createCompanySection = document.getElementById('create-company-section')
const createCompanyName = document.getElementById('createCompanyName')
const createCompanyBtn = document.getElementById('createCompanyBtn')

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


var inputs = document.querySelectorAll('.inputfile');
Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
        var fileName = '';
        if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else
            fileName = e.target.value.split('\\').pop()

        if (fileName)
            label.innerText = fileName;
        else
            label.innerHTML = labelVal;
    });
});

const renderJobs = (jobs) => {
    // Clears Job container
    for (const job of jobs) {
        const jobElem = htmlToElement(
            `<div class="job-card">
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
                        Posted on ${timeFormat.format(new Date(job.datePosted))}
                    </div>
                </div>`)
        jobElem.addEventListener('click', () => {
            location.href = `job.html?jobId=${job.id}`
        })
        jobList.appendChild(jobElem)
    }
}

app.getUser().then((user) => {
    console.log(user)

    fullname.innerText = user.name
    email.innerText = user.email

    if (user.company) {
        companyName.innerText = user.company.name

        app.getJobs({
            companyId: user.company.id
        }).then(renderJobs)
    } else {
        companySection.hidden = true
        createCompanySection.hidden = false
    }

})

app.hasCV().then((result) => {
    if (result.hasCV) {

        const cvElem = htmlToElement(`
            <a class='CV-download'>CV</a>
        `)
        cv.appendChild(cvElem)

        app.getCV().then((blob) => {
            var blobUrl = URL.createObjectURL(blob);
            var link = cvElem
            link.href = blobUrl;
            link.download = "cv.pdf"
        })

    } else {
        cv.innerHTML = 'CV not uploaded yet'
    }
})

fileUploadBtn.addEventListener('click', () => {
    const cv = cvUpload.files[0]
    if (!cv) {
        alert("You didn't select a file")
        return
    }
    app.uploadCV(cv).then((resp) => {
        if (resp.success) location.reload()
    })
})

createCompanyBtn.addEventListener('click', () => {
    app.createCompany(createCompanyName.value).then(() => {
        location.reload()
    })
})