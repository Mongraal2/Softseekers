const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');

const resgisterUser = expressAsyncHandler(async (req, res) => {
    let { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const duplicate = await User.findOne({ username });

    if (duplicate) {
        res.status(400);
        throw new Error("Username already exists");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Failed to create new User');
    }
});

const authUser = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        req.params.username = username;
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { username: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ]
        } : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})

const editUser = expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email) {
        res.status(400);
        throw new Error("Please enter all the required fields");
    }
    const user = req.user;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    if (password) {
        console.log(password)
        // user.password = password;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await user.save();

    res.json({ message: `${user.username} updated` });
})
module.exports = { resgisterUser, authUser, allUsers, editUser };
