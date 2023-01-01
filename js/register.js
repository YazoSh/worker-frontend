const registerName = document.getElementById('name')
const registerEmail = document.getElementById('email')
const registerUsername = document.getElementById('username')
const registerPassword = document.getElementById('password')
const registerBtn = document.getElementById('registerBtn')

const app = new Application('http://localhost:3000')

registerBtn.addEventListener('click', (e) => {
    e.preventDefault()

    app.register(
        registerName.value,
        registerEmail.value,
        registerUsername.value,
        registerPassword.value,
    ).then((resp) => {
        if(resp.success) location.href = 'login.html'
    })
})