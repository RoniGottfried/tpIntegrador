let products = require("../db/products")
const productsController = {

    producto: function (req, res) {
      return res.render('products', {products: products})
    },
    add: function (req, res) {
        return res.render('product-add');
    },
    buscarProducto: function (req, res) {
        return res.render('search-results');
    },
    
  };
  
  module.exports = productsController;