const productsController = {

    producto: function (req, res) {
      return res.render('products')
    },
    add: function (req, res) {
        return res.render('product-add');
    },
    buscarProducto: function (req, res) {
        return res.render('search-results');
    },
    
  };
  
  module.exports = productsController;