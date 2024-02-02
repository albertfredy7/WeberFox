const User = require('../models/user')

// 1. api end point which gives the all the users data

async function getAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

// 2. api endpoint for getting specified users by id
async function getUserById(req,res){
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' })
    }
    return res.json(user)
}

//3. api end point for getting specified user by name
async function getUserByName(req, res) {
    const users = await User.find({ first_name: req.params.first_name });

    if (users.length === 0) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    return res.json(users);
}

// 4. api end point for creating a new user
async function addUser(req, res) {
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

    return res.status(201).json({ status: 'success', message: 'User created successfully',id:result._id })
}

// 5. api endpoint for updating the user
async function updateUser(req, res) {
    await User.findByIdAndUpdate(req.params.id, req.body)
    return res.json({ status: 'success', message: 'User updated successfully' });
}

// 6. api endpoint for deleting a user
async function deleteUser(req, res) {
    await User.findByIdAndDelete(req.params.id)
    res.json({ status: 'success', message: 'User deleted successfully' });
}

module.exports={
    getAllUsers,
    getUserById,
    getUserByName,
    addUser,
    updateUser,
    deleteUser
}