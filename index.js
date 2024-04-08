const express = require('express')
const users =  require('./MOCK_DATA.json')
const fs = require('fs')
const mongoose = require('mongoose')
const { strict } = require('assert')
const { type } = require('os')
const { timeStamp } = require('console')

const app = express()
const PORT = 8001

//middleware c
app.use(express.urlencoded({extended: false}))


//routes
app.get('/users', (req, res) => {
    return res.json(users)
})

app.get('/api/users', async  (req, res) => {
    const allUsers = await User.find({})
    const html = 
    `<ul>
        ${allUsers.map((user) => `<li>${user.email}</li>`).join()}
    </ul>`
    return res.send(html)
})

//conecting mongoose 
mongoose.connect('mongodb://0.0.0.0:27017/firstdb')
.then(() => console.log('mongo db connected'))
.catch((err) => console.log(err, 'mongo err'))
//schema
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    ip_address: {
        type: Number,

    },
    // {timeStamp: true}
})

//model

const User = mongoose.model('user', UserSchema)

// dynamic path params
// grouping of routes
app.route('/api/users/:id')
.get(async(req, res) => {
    const user = await User.findById(id.params.id)
    return res.json(user)
})
.patch(async (req, res) => {
    // edit user wid perticular id
    await User.findByIdAndUpdate(req.params.id)
    return res.json({staus: 'success'})
})

.delete(async (req, res) => {
    // delte user wid perticular id
    await User.findByIdAndDelete(req.params.id)
    return res.json({staus: 'deleted'})
})

app.post('/api/users/', async (req, res) => {
    const body = req.body
    // create new  user 
    console.log(req.body)
    const result = await User.create({
        FirstName: body.first_name,
        LastName:  body.last_name,
        email: body.email,
        gender: body.gender,
    })

    console.log(result, 'result')
    return res.status(201).json({msg: 'success'})

    // users.push({...req.body, id: users.length + 1})
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({staus: 'pending'})
    // })
   
})



app.listen(PORT, () => {
    console.log('I am a server at port 8001')
})