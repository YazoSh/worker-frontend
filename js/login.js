const username = document.getElementById('username')
const password = document.getElementById('password')
const loginBtn = document.getElementById('loginBtn')

const app = new Application('http://localhost:3000')

loginBtn.addEventListener('click', () => {
    app.login(username.value, password.value).then((success) => {
        if (success) location.href = 'index.html'
    })
})