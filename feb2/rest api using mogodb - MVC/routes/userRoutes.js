// routes

const express = require('express')
const router = express.Router()
const {getAllUsers, getUserById,getUserByName, updateUser, deleteUser, addUser} = require('../controllers/userController')

// 1. api end point which gives the all the users data


router.get('/',getAllUsers )

// 2. api endpoint for getting specified users by id
router.get('/:id', getUserById)

//3. api end point for getting specified user by name
router.get('/byName/:first_name', getUserByName)

// // 3. api end point for creating a new user

router.post('/', addUser)

// 5. api endpoint for updating a user
router.patch('/:id',updateUser );

// 5. api endpoint for deleting a user

router.delete('/:id',deleteUser );


module.exports = router;