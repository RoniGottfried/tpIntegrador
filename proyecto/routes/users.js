var express = require('express');
var router = express.Router();


// Register
const registerController = require("../controllers/userController");
router.get ('/register', registerController.register)

// Login
const loginController = require("../controllers/userController");
router.get ('/login', loginController.login);

// Perfil
const perfilController = require("../controllers/userController");
router.get ('/perfil', perfilController.perfil);

module.exports = router;
