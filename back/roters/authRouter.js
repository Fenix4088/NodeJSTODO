const Router = require("express");
const AuthController = require("../controllers/authController");
const router = new Router();

router.use((req, res, next) => {
    next();
});

router.post('/register', AuthController.register)

module.exports = router;