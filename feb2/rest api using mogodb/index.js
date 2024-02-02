const express = require('express')
const app = express()
const port = 5000

const fs = require('fs')
const mongoose = require('mongoose')

//MongoDB Connection

mongoose.connect('mongodb://127.0.0.1:27017/users')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log('error in connecting to mongodb', err))

const userSchema = new mongoose.Schema({
    first_name: {
        type: "String",
        required: true
    },
    last_name: {
        type: "String",
    },
    email: {
        type: "String",
        required: true,
        unique: true
    },
    gender: {
        type: "String"
    }
})

// creating model using schema
const User = mongoose.model('User', userSchema)



//middleware for encoded form data
app.use(express.urlencoded({ extended: false }))






// routes

// 1. api end point which gives the all the users data


app.get('/api/users', async (req, res) => {
    console.log('inside route', req.myuserName);
    const allDbUsers = await User.find({})

    // setting custom headers
    res.setHeader('X-myName', 'sachin')
    return res.json(allDbUsers)
})



// 2. for html rendering routes for display all the first name of the users in the browser
app.get('/users', async (req, res) => {

    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map(item => (`
            <li>${item.first_name} - ${item.email}</li>`
    )).join("")}
    </ul>
    `
    res.send(html)
})


// 3. api endpoint for getting specific users 
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' })
    }
    return res.json(user)
})

// 4. api end point for creating a new user

app.post('/api/users', async (req, res) => {
    console.log('inside post route');
    const body = req.body
    // console.log(body);
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender) {
        return res.status(400).json({ status: 'error', message: 'Please provide all the required fields' })
    }


    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender
    })

    console.log(result);

    return res.status(201).json({ status: 'success', message: 'User created successfully' })


})

// 5. api endpoint for updating a user
app.patch('/api/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    return res.json({ status: 'success', message: 'User updated successfully' });


});

// 5. api endpoint for deleting a user

app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({ status: 'success', message: 'User deleted successfully' });
});





// server starting
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})