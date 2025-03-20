const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Register = async (req, res, next) => {
    try {
        const { name, email, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exsistingAdmin = await Admin.findOne({ username: username });

        if (exsistingAdmin) {
            return res.status(400).json({ message: "Username already in use" });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new Admin({ name, email, username, password: hashedPassword });
        await user.save();

        const { password: userPassword, ...other } = user._doc;
        return res.status(200).json({
            user: other,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.Login = async (req, res, next) => {
    try {


        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json("All fields are required");
        }

        const exsistingAdmin = await Admin.findOne({ username: username });

        if (!exsistingAdmin) {
            return res.status(400).json({ message: "No user with this username" });
        }

        const isPasswordMatch = await bcrypt.compare(password, exsistingAdmin.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Password is not match!" });
        }
        const { password: userPassword, ...other } = exsistingAdmin._doc;

        const token = jwt.sign({ id: exsistingAdmin._id }, 'Assignment', { expiresIn: '3d' });

        res.status(200).json({
            message: "User logged succesfully",
            token,
            user: other
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}