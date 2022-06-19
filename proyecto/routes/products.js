const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productsController");

// Productos
router.get ('/:id?', productsController.producto);

// Agregado de Productos
router.get ('/product/add', productsController.add);

// Resultados de Busqueda

router.get ('/search/results', productsController.searchId);




module.exports = router;