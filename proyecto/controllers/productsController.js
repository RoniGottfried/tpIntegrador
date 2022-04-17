let products = require("../db/products")
let comentarios = require("../db/comentarios")
const productsController = {

    producto: function (req, res) {
      return res.render('products', {comics: products.lista, comentarios: comentarios.lista})
    },
    add: function (req, res) {
        return res.render('product-add');
    },
    buscarProducto: function (req, res) {
        return res.render('search-results', {comics: products.lista});
    },
    
  };
  
  module.exports = productsController;