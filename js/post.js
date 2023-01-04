const title = document.getElementById('title')
const jobLocation = document.getElementById('location')
const industry = document.getElementById('industry')
const jobLevel = document.getElementById('jobLevel')
const description = document.getElementById('description')
const postBtn = document.getElementById('postJobBtn')

const app = new Application('http://localhost:3000')

postBtn.addEventListener('click', () => {
    app.createJob({
            title: title.value,
            location: jobLocation.value,
            industry: industry.value,
            careerLevel: jobLevel.value,
            description: description.value
        }).then((resp) => {
            if(resp.success) location.href = 'profile.html'
        })
})