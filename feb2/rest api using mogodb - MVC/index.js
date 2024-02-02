const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')

//MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/users')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log('error in connecting to mongodb', err))

// importing routes
const userRouter = require('./routes/userRoutes')

//middleware for encoded form data
app.use(express.urlencoded({ extended: false }))

//using the routes 
app.use('/users',userRouter)

// server starting
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})