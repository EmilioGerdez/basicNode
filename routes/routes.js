const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { check} = require('express-validator');
const { createUser, loginUser, logoutUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/controllers');

//POST - Create new user
router.post('/users', [
  check('name', 'Name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
], createUser);

//POST - Login user
router.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
], loginUser);

//POST - Logout user
router.post('/logout', logoutUser);

//GET - Get user by id
router.get('/users/:id', verifyToken, getUser);

//GET - Get all users
router.get('/users', verifyToken, getUsers);

//PUT - Update user
router.put('/users/:id', verifyToken, updateUser);

//DELETE - Delete user
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;