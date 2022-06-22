const express = require('express');
const router = express.Router();
let multer = require('multer');
let path = require('path');

const productsController = require("../controllers/productsController");

// multer para subir archivos al servidor
let storage = multer.diskStorage({  
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/products'))
    },  

    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }    
})
let upload = multer({storage: storage}) 

// Productos
router.get ('/:id?', productsController.detail);

// Agregado de Productos
router.get ('/add', productsController.add);
router.post("/add", upload.single('image_product'), productsController.productProcess);

// Resultados de Busqueda

router.get ('/search/results', productsController.search);




module.exports = router;