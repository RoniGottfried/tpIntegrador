var express = require('express');
var router = express.Router();
let multer = require('multer');
let path = require('path');
const userController = require("../controllers/userControllers");

// Multer Config

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/profilePic'))
    },  // donde se suben los archivos
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }      // Nombre del archivo
})

let upload = multer({storage: storage});

// Register
router.get ('/register', userController.register)
router.post('/register', upload.single('image_profile'), userController.registerProcess)

// Login 
router.get('/login', userController.login);
router.post('/login', userController.loginProcess);

//logout
router.post('/logout', userController.logout);

// Perfil
router.get ('/perfil', userController.perfil);

// Perfil Edit
router.get('/perfil-edit/:id', userController.perfilEdit);
router.post('/perfil-edit/profileStore', userController.perfilStore)


module.exports = router;

