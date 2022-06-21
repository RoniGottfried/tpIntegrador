var express = require('express');
var router = express.Router();
const userController = require("../controllers/userControllers");

// Register
router.get ('/register', userController.register)

// Login 
router.get('/login', userController.login);
router.post('/login', userController.loginProcess);

// Perfil
router.get ('/perfil', userController.perfil);

// Perfil Edit
router.get ('/perfil/edit', userController.perfilEdit);



module.exports = router;

