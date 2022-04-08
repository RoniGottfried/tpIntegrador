var express = require('express');
var router = express.Router();


// Register
const registerController = require("../controllers/userControllers");
router.get ('/register', registerController.register)

// Login
const loginController = require("../controllers/userControllers");
router.get ('/login', loginController.login);

// Perfil
const perfilController = require("../controllers/userControllers");
router.get ('/perfil', perfilController.perfil);

module.exports = router;
