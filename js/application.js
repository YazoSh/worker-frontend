class Application {
    constructor(hosturl) {
        this.hosturl = hosturl

        this.user = null

        this.careerLevel = {
            Entry: 'entry',
            Intermediate: 'intermediate',
            Senior: 'senior',
        }

        // Constants
        this.jwtLocalKey = 'jwtKey'
    }

    getLoginToken() {
        return localStorage.getItem(this.jwtLocalKey)
    }

    logout() {
        localStorage.removeItem(this.jwtLocalKey)
        this.user = null
    }

    async isLoggedIn() {
        return (await this.getUser()) != null
    }

    async login(username, password) {
        try {
            const res = await fetch(this.hosturl + '/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })

            if (res.status === 201) {
                const jwt = await res.json()
                localStorage.setItem(this.jwtLocalKey, jwt.access_token)
                return true
            } else throw new Error('Unauthorized')
        } catch (e) {
            this.logout()
            console.log(e)
            alert('Incorrect Userame or Password')
            return false
        }
    }

    async getUser() {
        if (this.user) return this.user

        const token = this.getLoginToken()
        if (!token) return null

        try {
            const res = await fetch(this.hosturl + '/user', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.status === 200) {
                this.user = (await res.json()).data
                return this.user
            } else throw new Error('Unauthorized')
        } catch (e) {
            this.logout()
            console.log(e)
            return null
        }
    }

    async register(name, email, username, password) {
        return await fetch(this.hosturl + '/user/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                username,
                password,
            }),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp)
                    if (resp.statusCode === 400) alert(...resp.message)
                    else if (resp.statusCode === 403) alert(resp.error)
                return resp
            })
            .catch(console.log)
    }

    async createCompany(name) {
        const token = this.getLoginToken()

        fetch(this.hosturl + '/user/company', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
            }),
        })
            .then((resp) => {
                if (resp)
                    if (resp.statusCode === 400) alert(...resp.message)
                    else if (resp.statusCode === 403) alert(resp.error)
            })
            .catch(console.log)
    }

    async getCompany() {
        const user = await this.getUser()
        if (!user) return null

        if (user.comapany) return user.company

        const token = this.getLoginToken()

        try {
            const resp = await fetch(this.hosturl + '/user/company', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => resp.json())

            if (!resp.success) return false

            if (resp && resp.statusCode === 403) throw new Error(resp.error)

            user.company = resp.data
            return user.company
        } catch (e) {
            console.log(e)
        }
    }

    async createJob({
        title,
        location,
        description,
        industry,
        careerLevel,
    } = {}) {
        const token = this.getLoginToken()

        return await fetch(this.hosturl + '/job', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                location,
                description,
                industry,
                careerLevel,
            }),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp)
                    if (resp.statusCode === 400) alert(...resp.message)
                    else if (resp.statusCode === 403) alert(resp.error)
                return resp
            })
            .catch(console.log)
    }

    async getJobs({
        companyId,
        title,
        location,
        description,
        industry,
        careerLevel,
        page,
    } = {}) {
        return await fetch(this.hosturl + '/job/search', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                companyId,
                title,
                location,
                description,
                industry,
                careerLevel,
                page,
            }),
        }).then((resp) => resp.json())
    }

    async getJobById(id) {
        return fetch(this.hosturl + '/job/' + id, {
            method: 'GET',
            mode: 'cors',
        }).then((resp) => resp.json())
    }

    async applyToJob(id) {
        const token = this.getLoginToken()

        return await fetch(this.hosturl + '/job/apply/' + id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (!resp.success) alert(resp.message)
                return resp
            })
    }

    async getJobApplicants(id) {
        const token = this.getLoginToken()

        return await fetch(this.hosturl + '/job/apply/' + id, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (!resp.success) alert(resp.message)
                console.log(resp)
                return resp.data
            })
    }

    async uploadCV(cv) {
        const token = this.getLoginToken()

        const formData = new FormData()
        formData.append('cv', cv)

        return await fetch(this.hosturl + '/file/cv', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (!resp.success) alert(resp.message)
                return resp
            })
    }

    async hasCV() {
        return await fetch(
            this.hosturl + '/file/cv/' + (await this.getUser()).id,
            {
                method: 'GET',
                mode: 'cors',
            },
        ).then((resp) => resp.json())
    }

    async getCV() {
        return await fetch(
            this.hosturl + '/file/cv/download/' + (await this.getUser()).id,
            {
                method: 'GET',
                mode: 'cors',
            },
        ).then((resp) => resp.blob())
    }
}
