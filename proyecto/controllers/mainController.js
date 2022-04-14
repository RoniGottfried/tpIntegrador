let products = require("../db/products");
const mainController = {
    index: function (req, res) {
      return res.render('index', {comics: products.lista});
    },
    
  };
  
  module.exports = mainController;