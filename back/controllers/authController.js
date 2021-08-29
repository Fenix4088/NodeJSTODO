const {USER} = require("../schemas/schemas");
const bcryptjs = require('bcryptjs');


class AuthController {
    async register(req, res) {
        try {
            const {login, password} = req.body;
            const candidate = await USER.findOne({name: login});
            if(candidate) {
                return res.status(400).json({message: 'User already exist'});
            } else {
                const hashedPassword = bcryptjs.hashSync(password, 7);
                const newUser = new USER({name: login, password: hashedPassword});
                await newUser.save();
                return res.status(200).send({message: 'User was create'});
            }
        } catch (e) {

        }
    }
}

module.exports = new AuthController();