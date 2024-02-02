const express = require('express')
const app = express()
const port  = 5000

const fs = require('fs')


const users = require('./MOCK_DATA.json')


app.use(express.json())

//middleware for encoded form data
app.use(express.urlencoded({extended:false}))


// middleware 

app.use((req,res,next)=>{
    console.log('middleware 1 is working');
    req.myuserName='sachin'
    next()
})


app.use((req,res,next,)=>{
    console.log('middleware 2 is working',req.myuserName);
    next()
})

app.use((req,res,next)=>{
    fs.appendFile('log.txt',`request made to ${req.url} at ${Date.now()} \n`,(err,data)=>{
        console.log('log file created');
        next()
    })
})



// routes

// 1. api end point which gives the all the users data


app.get('/api/users',(req,res)=>{
    console.log('inside route',req.myuserName);
    return res.json(users)
})



// 2. for html rendering routes for display all the first name of the users in the browser
app.get('/users',(req,res)=>{
    const html= `
    <ul>
        ${users.map(item=>(`
            <li>${item.first_name}</li>`
        )).join("")}
    </ul>
    `
    res.send(html)
})


// 3. api endpoint for getting specific users 
app.get('/api/users/:id',(req,res)=>{
    const id =Number(req.params.id)
    const user = users.find(user=>user.id === id)
    return res.json(user)
})

// 4. api end point for creating a new user

app.post('/api/users',(req,res)=>{
    console.log('inside post route');
    const body = req.body
    console.log(body);
    users.push({...body,id:users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status: 'success'} )
    })
    
})

// 5. api endpoint for updating a user
app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedUser = req.body;

    // Find the index of the user with the specified id
    const userIndex = users.findIndex(user => user.id === id);

        // Update the user data 
        users[userIndex] = { ...users[userIndex], ...updatedUser };

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
            return res.json({ status: 'success', message: 'User updated successfully' });
        });
    
});

// 5. api endpoint for deleting a user

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    // Remove the user from the users array
    users.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        return res.json({ status: 'success', message: 'User deleted successfully' });
    });
});





// server starting
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})