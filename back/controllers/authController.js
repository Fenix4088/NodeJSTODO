const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {USER} = require("../schemas/schemas");


class AuthController {
    async register(req, res) {
        try {
            const {login, password} = req.body;
            const candidate = await USER.findOne({name: login});
            if (candidate) {
                return res.status(400).json({message: 'User already exist'});
            } else {
                const hashedPassword = bcryptjs.hashSync(password, 7);
                const newUser = new USER({name: login, password: hashedPassword});
                await newUser.save();
                return res.status(200).json({message: 'User was create'});
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body;

            const user = await USER.findOne({name: login});
            const isPassword = bcryptjs.compareSync(password, user.password);

            if (!user) {
                return res.status(400).json({message: "Wrong login or password"});
            }

            if(!isPassword) {
                return res.status(400).json({message: "Wrong login or password"});
            }

            const token = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, { expiresIn: '3600s' })

            return res.status(200).json({message: "Login success", token});

        } catch (e) {
            return res.status(500).json({message: "Server error"});
        }

    }
}

module.exports = new AuthController();