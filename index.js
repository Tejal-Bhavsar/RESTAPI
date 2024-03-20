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

// dynamic path params
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

app.post('/api/users/', (req, res) => {
    // create new  user 
    return res.json({staus: 'pending'})
})

app.patch('/api/users/:id', (req, res) => {
    // edit user wid perticular id
    return res.json({staus: 'pending'})
})

app.delete('/api/users/:id', (req, res) => {
    // delte user wid perticular id
    return res.json({staus: 'pending'})
})

app.listen(PORT, () => {
    console.log('I am a server at port 8000')
})