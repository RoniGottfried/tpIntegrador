var express = require('express');
var router = express.Router();


const comentariosController = require("../controllers/comentariosControllers");



router.get('/cometarios', comentariosController.index);





module.exports = router;