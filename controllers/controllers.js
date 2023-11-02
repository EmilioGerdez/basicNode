const {User} = require('../models/models');


//create new user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get user by id
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'name', 'lastName', 'username', 'email'],
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'lastName', 'username', 'email'],
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update user
const updateUser = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login user
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // check if the password is valid including the salt
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        res.json({ auth: true, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//logout user
const logoutUser = async (req, res) => {
    res.json({ auth: false, token: null });
};

module.exports = { createUser, loginUser, logoutUser, getUser, getUsers, updateUser, deleteUser };