

class AuthController {
    register(req, res) {
        try {
            const {login, password} = req.body;
            res.status(200).send(req.body);
        } catch (e) {

        }
    }
}

module.exports = new AuthController();