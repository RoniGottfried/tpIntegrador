let products = require("../db/products")
let comentarios = require("../db/comentarios")
const productsController = {

    producto: function (req, res) {
      return res.render('products', {products: products}, {comentarios: comentarios})
    },
    add: function (req, res) {
        return res.render('product-add');
    },
    buscarProducto: function (req, res) {
        return res.render('search-results');
    },
    
  };
  
  module.exports = productsController;