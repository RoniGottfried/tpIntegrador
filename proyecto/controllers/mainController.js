const db = require('../database/models');

let products = require("../db/products");
let comentarios = require("../db/comentarios")
const mainController = {
    index: function (req, res) {
      return res.render('index', {comics: products.lista, comentarios});
    },
    
  };
  
  module.exports = mainController;