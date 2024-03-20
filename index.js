const express = require('express')
const users =  require('./MOCK_DATA.json')

const app = express()
const PORT = 8000

//routes
app.get('/users', (req, res) => {
    return res.json(users)
})

app.get('/api/users', (req, res) => {
    const html = 
    `<ul>
        ${users.map((user) => `<li>${user.email}</li>`).join()}
    </ul>`
    return res.send(html)
})

app.listen(PORT, () => {
    console.log('I am a server at port 8000')
})